import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { NewsController } from '~/controllers/index'
import { NewsRepository } from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'
import { createStorage, newsPath } from '~/helpers/index'
import { SocketService } from '~/services/usecases/index'
import type { Server } from 'socket.io'

const upload = createStorage(newsPath)

export const makeNewsRoutes = (io: Server): FastifyPluginAsync => {
	const socketService = new SocketService(io)
	const controller = new NewsController(NewsRepository, socketService)

	const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
		fastify.get('/news', controller.getAll.bind(controller))
		fastify.get('/news/:id', controller.getById.bind(controller))
		fastify.get('/news-flags', controller.getFlags.bind(controller))

		fastify.post('/news', { preHandler: [authMiddleware, upload.single('avatar')] }, controller.create.bind(controller))

		fastify.put(
			'/news/:id',
			{ preHandler: [authMiddleware, upload.single('avatar')] },
			controller.update.bind(controller),
		)
	}

	return routes
}
