import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { AllDepartmentsController } from '~/controllers/index'
import { DepartmentsRepository } from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'

const allDepartmentsController = new AllDepartmentsController(DepartmentsRepository)

const departmentsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get(
		'/departments',
		{ preHandler: [authMiddleware] },
		allDepartmentsController.getAll.bind(allDepartmentsController),
	)
}

export default departmentsRoutes
