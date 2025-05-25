import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { NotificationsController } from '~/controllers/index'
import { NotificationsRepository } from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'

const controller = new NotificationsController(NotificationsRepository)

const notificationsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/notifications', { preHandler: [authMiddleware] }, controller.getAll.bind(controller))

	fastify.patch('/notifications', { preHandler: [authMiddleware] }, controller.update.bind(controller))
}

export default notificationsRoutes
