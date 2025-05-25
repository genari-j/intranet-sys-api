import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { UsersController } from '~/controllers/index'
import {
	UsersRepository,
	AddressesRepository,
	DepartmentsRepository,
	ProfilesRepository,
	SigninHistoryRepository,
} from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'

const controller = new UsersController(
	UsersRepository,
	AddressesRepository,
	DepartmentsRepository,
	ProfilesRepository,
	SigninHistoryRepository,
)

const usersRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.post('/signin', controller.signIn.bind(controller))

	// TODO: Testar o middleware de permissões - "permMiddleware"
	// fastify.get('/users', { preHandler: [authMiddleware, permissionMiddleware({ requiredRole: 'admin' })] }, controller.getAll.bind(controller))
	fastify.get('/users/:id', { preHandler: [authMiddleware] }, controller.getById.bind(controller))
}

export default usersRoutes
