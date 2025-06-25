import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import {
	AllFlagsController,
	AllNewsController,
	CreateNewsController,
	NewsByIdController,
	UpdateNewsController,
} from '~/controllers/index'
import { NewsRepository } from '~/models/repositories/index'

import type { Server } from 'socket.io'
import { createStorage, newsPath } from '~/helpers/index'
import { authMiddleware } from '~/middlewares/index'
import { SocketService } from '~/services/usecases/index'

const upload = createStorage(newsPath)

export const makeNewsRoutes = (io: Server): FastifyPluginAsync => {
	const socketService = new SocketService(io)

	const allFlagsController = new AllFlagsController(NewsRepository)
	const allNewsController = new AllNewsController(NewsRepository)
	const newsByIdController = new NewsByIdController(NewsRepository)
	const createNewsController = new CreateNewsController(socketService)
	const updateNewsController = new UpdateNewsController(socketService)

	const routes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
		fastify.get('/news', allNewsController.getAll.bind(allNewsController))
		fastify.get('/news/:id', newsByIdController.getById.bind(newsByIdController))
		fastify.get('/news-flags', allFlagsController.getFlags.bind(allFlagsController))

		fastify.post(
			'/news',
			{ preHandler: [authMiddleware, upload.single('avatar')] },
			createNewsController.create.bind(createNewsController),
		)

		fastify.put(
			'/news/:id',
			{ preHandler: [authMiddleware, upload.single('avatar')] },
			updateNewsController.update.bind(updateNewsController),
		)
	}

	return routes
}
