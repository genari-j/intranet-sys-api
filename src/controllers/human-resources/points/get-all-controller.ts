import type { FastifyReply, FastifyRequest } from 'fastify'

import type { GetPointsResponse } from '~/@types/index'
import type { HumanResourcesPointsInterfaceRepository } from '~/models/interfaces/index'

import { created, decodeRequestAuthToken, internalError, ok, unauthorized } from '~/helpers/index'
import { env, getHumanResourcesPointsFiltersQuerySchema } from '~/validators/index'

export class AllPointsController {
	private readonly humanResourcesPointsRepository: HumanResourcesPointsInterfaceRepository

	constructor(humanResourcesPointsRepository: HumanResourcesPointsInterfaceRepository) {
		this.humanResourcesPointsRepository = humanResourcesPointsRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetPointsResponse | undefined> {
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

			const filters = getHumanResourcesPointsFiltersQuerySchema.parse(query)

			const { data, total, pages, currentPage } = await this.humanResourcesPointsRepository.findAllUserPoints(
				skip,
				Number(limit),
				filters,
				user.id as string,
			)

			const mappedUserPoints = data.map((point) => {
				return {
					id: point.id,
					entry: point.entry,
					lunch_out: point.lunch_out,
					lunch_return: point.lunch_return,
					departure: point.departure,
					user: {
						user_id: point.user.id,
						name: point.user.name,
					},
					active: point.active,
					created_at: point.created_at,
					updated_at: point.updated_at,
					deleted_at: point.deleted_at,
				}
			})

			return ok(reply, {
				data: mappedUserPoints,
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
