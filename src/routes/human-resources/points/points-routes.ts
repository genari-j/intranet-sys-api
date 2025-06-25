import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { AllPointsController, CreatePointController } from '~/controllers/index'
import { HumanResourcesPointsRepository } from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'

const createPointController = new CreatePointController(HumanResourcesPointsRepository)
const allPointsController = new AllPointsController(HumanResourcesPointsRepository)

const humanResourcesPointsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get(
		'/human-resources-points',
		{ preHandler: [authMiddleware] },
		allPointsController.getAll.bind(allPointsController),
	)

	fastify.post(
		'/human-resources-points',
		{ preHandler: [authMiddleware] },
		createPointController.create.bind(createPointController),
	)
}

export default humanResourcesPointsRoutes
