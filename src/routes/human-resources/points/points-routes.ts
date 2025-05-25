import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { HumanResourcesPointsController } from '~/controllers/index'
import { HumanResourcesPointsRepository } from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'

const controller = new HumanResourcesPointsController(HumanResourcesPointsRepository)

const humanResourcesPointsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/human-resources-points', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))

	fastify.post('/human-resources-points', { preHandler: [authMiddleware] }, controller.create.bind(controller))
}

export default humanResourcesPointsRoutes
