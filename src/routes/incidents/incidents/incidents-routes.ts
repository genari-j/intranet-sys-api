import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { IncidentsController } from '~/controllers/index'

import { authMiddleware } from '~/middlewares/index'
import { createStorage, incidentsPath } from '~/helpers/index'

const upload = createStorage(incidentsPath)

const controller = new IncidentsController()

const incidentsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.post(
		'/incidents',
		{ preHandler: [authMiddleware, upload.array('avatar')] },
		controller.create.bind(controller),
	)
}

export default incidentsRoutes
