import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { IncidentByIdController, CreateIncidentController, AllIncidentsController } from '~/controllers/index'
import { IncidentsRepository } from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'
import { createStorage, incidentsPath } from '~/helpers/index'

const upload = createStorage(incidentsPath)

const incidentByIdController = new IncidentByIdController(IncidentsRepository)
const createController = new CreateIncidentController()
const getAllController = new AllIncidentsController(IncidentsRepository)

const incidentsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/incidents', { preHandler: [authMiddleware] }, getAllController.getAll.bind(getAllController))
	fastify.get('/incidents/:id', incidentByIdController.getById.bind(incidentByIdController))

	fastify.post(
		'/incidents',
		{ preHandler: [authMiddleware, upload.array('avatar')] },
		createController.create.bind(createController),
	)
}

export default incidentsRoutes
