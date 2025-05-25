import type { FastifyReply, FastifyRequest } from 'fastify'

import { NotificationService } from '~/services/usecases/index'
import type { NotificationsInterfaceRepository } from '~/models/interfaces/index'
import type { GetNotificationsResponse } from '~/@types/index'

import { decodeRequestAuthToken, internalError, ok, unauthorized } from '~/helpers/index'
import { env, getNotificationsFiltersQuerySchema, updateNotificationsBodySchema } from '~/validators/index'

export class NotificationsController {
	private readonly notificationsRepository: NotificationsInterfaceRepository

	constructor(notificationsRepository: NotificationsInterfaceRepository) {
		this.notificationsRepository = notificationsRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetNotificationsResponse | undefined> {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)
			if (!user) return unauthorized(reply)

			const query = request.query as {
				page?: string
				limit?: string
				date?: string
			}

			const page = Number(query.page ?? env.INITIAL_DATA_OFFSET)
			const limit = Number(query.limit ?? env.LIST_PER_PAGE)
			const skip = (page - 1) * limit

			const filters = getNotificationsFiltersQuerySchema.parse(query)

			const { data, total, pages, currentPage } = await this.notificationsRepository.findAllUserNotifications(
				skip,
				Number(limit),
				filters,
				user.id,
			)

			const mappedUserNotifications = data.map((point) => {
				return {
					id: point.id,
					title: point.title,
					description: point.description,
					user: {
						id: point.user.id,
						name: point.user.name,
					},
					read: point.read,
					active: point.active,
					created_at: point.created_at,
					updated_at: point.updated_at,
				}
			})

			return ok(reply, {
				data: mappedUserNotifications,
				pagination: {
					limit: Number(limit),
					total,
					pages,
					currentPage,
				},
			})
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}

	async update(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)
			if (!user) return unauthorized(reply)

			const { notificationsIDs } = updateNotificationsBodySchema.parse(request.body)

			const service = new NotificationService()

			const updatedNotifications = await service.markAsReadByIDs({
				userId: user.id,
				notificationsIDs: notificationsIDs,
			})

			return ok(reply, updatedNotifications, `${notificationsIDs.length} Notificações atualizadas com sucesso.`)
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
