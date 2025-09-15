import type { FastifyReply, FastifyRequest } from 'fastify'

import type { IncidentsInterfaceRepository } from '~/models/interfaces/index'

import type { GetIncidentsResponse } from '~/@types/index'
import { decodeRequestAuthToken, internalError, ok, unauthorized } from '~/helpers/index'
import { env, getIncidentsFiltersQuerySchema } from '~/validators/index'

export class AllIncidentsController {
	private readonly incidentsRepository: IncidentsInterfaceRepository

	constructor(incidentsRepository: IncidentsInterfaceRepository) {
		this.incidentsRepository = incidentsRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetIncidentsResponse | undefined> {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)
			if (!user) return unauthorized(reply)

			const canSeeAllIncidents = user.permissions.some((perm) => perm.permission.name === 'Visualizar todos chamados')

			const query = request.query as {
				page?: string
				limit?: string
				code?: string
				status_id?: string
				priority_id?: string
				assigned_id?: string
				created_at?: Date
			}

			const page = Number(query.page ?? env.INITIAL_DATA_OFFSET)
			const limit = Number(query.limit ?? env.LIST_PER_PAGE)
			const skip = (page - 1) * limit

			const filters = getIncidentsFiltersQuerySchema.parse(query)

			const { data, total, pages, currentPage } = await this.incidentsRepository.findAllIncidents(
				skip,
				Number(limit),
				filters,
				user.department_id as string,
				canSeeAllIncidents,
			)

			const mappedIncidents = data.map((incident) => {
				return {
					id: incident.id,
					code: incident.code,
					title: incident.title,
					priority: {
						id: incident.priority.id,
						name: incident.priority.name,
					},
					assigned: {
						id: incident?.user?.id,
						name: incident?.user?.name,
					},
					status: {
						id: incident.status.id,
						name: incident.status.name,
					},
					created_at: incident.created_at,
				}
			})

			return ok(reply, {
				data: mappedIncidents,
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
