import type { FastifyInstance, FastifyPluginAsync } from 'fastify'

import { AllNotificationsController, UpdateNotificationsController } from '~/controllers/index'
import { NotificationsRepository } from '~/models/repositories/index'

import { authMiddleware } from '~/middlewares/index'

const allNotificationsController = new AllNotificationsController(NotificationsRepository)
const updateNotificationsController = new UpdateNotificationsController()

const notificationsRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get(
		'/notifications',
		{ preHandler: [authMiddleware] },
		allNotificationsController.getAll.bind(allNotificationsController),
	)

	fastify.patch(
		'/notifications',
		{ preHandler: [authMiddleware] },
		updateNotificationsController.update.bind(updateNotificationsController),
	)
}

export default notificationsRoutes
