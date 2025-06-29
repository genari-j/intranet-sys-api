import type { FastifyReply, FastifyRequest } from 'fastify'

import type { GetNotificationsResponse } from '~/@types/index'
import type { NotificationsInterfaceRepository } from '~/models/interfaces/index'

import { decodeRequestAuthToken, internalError, ok, unauthorized } from '~/helpers/index'
import { env, getNotificationsFiltersQuerySchema } from '~/validators/index'

export class AllNotificationsController {
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
				read?: string
				limit?: string
			}

			const page = Number(query.page ?? env.INITIAL_DATA_OFFSET)
			const limit = Number(query.limit ?? env.LIST_PER_PAGE)
			const skip = (page - 1) * limit

			const filters = getNotificationsFiltersQuerySchema.parse(query)

			const { data, total, pages, currentPage } = await this.notificationsRepository.findAllUserNotifications(
				skip,
				Number(limit),
				filters,
				user.id as string,
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
}
