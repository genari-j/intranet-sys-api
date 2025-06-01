import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { IncidentsController } from '~/controllers/index'
import { IncidentsRepository } from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'
import { createStorage, incidentsPath } from '~/helpers/index'

const upload = createStorage(incidentsPath)

const controller = new IncidentsController(IncidentsRepository)

const incidentsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/incidents', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))
	fastify.get('/incidents/:id', controller.getById.bind(controller))

	fastify.post(
		'/incidents',
		{ preHandler: [authMiddleware, upload.array('avatar')] },
		controller.create.bind(controller),
	)
}

export default incidentsRoutes
