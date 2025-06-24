import type { FastifyReply, FastifyRequest } from 'fastify'

import { NotificationService } from '~/services/usecases/index'

import { decodeRequestAuthToken, internalError, ok, unauthorized } from '~/helpers/index'
import { updateNotificationsBodySchema } from '~/validators/index'

export class UpdateNotificationsController {
	async update(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)
			if (!user) return unauthorized(reply)

			const { notificationsIDs } = updateNotificationsBodySchema.parse(request.body)

			const service = new NotificationService()

			const updatedNotifications = await service.markAsReadByIDs({
				userId: user.id as string,
				notificationsIDs: notificationsIDs,
			})

			return ok(reply, updatedNotifications, `${notificationsIDs.length} Notificações atualizadas com sucesso.`)
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
