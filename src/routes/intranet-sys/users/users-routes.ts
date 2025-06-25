import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { SignInController, UserByIdController } from '~/controllers/index'
import {
	AddressesRepository,
	DepartmentsRepository,
	PermissionsRepository,
	SigninHistoryRepository,
	UsersRepository,
} from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'

const userByIdController = new UserByIdController(UsersRepository, PermissionsRepository)

const signInController = new SignInController(
	UsersRepository,
	AddressesRepository,
	DepartmentsRepository,
	PermissionsRepository,
	SigninHistoryRepository,
)

const usersRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.post('/signin', signInController.signIn.bind(signInController))

	fastify.get('/users/:id', { preHandler: [authMiddleware] }, userByIdController.getById.bind(userByIdController))
}

export default usersRoutes
