import type { FastifyReply, FastifyRequest } from 'fastify'

import type { IncidentsInterfaceRepository } from '~/models/interfaces/index'
import { IncidentsService } from '~/services/usecases/index'

import { decodeRequestAuthToken, unauthorized, created, internalError, ok, notFound } from '~/helpers/index'
import type { GetIncidentsResponse } from '~/@types/index'
import {
	env,
	getIncidentsFiltersQuerySchema,
	createIncidentsBodySchema,
	incidentsParamsSchema,
} from '~/validators/index'

export class IncidentsController {
	private readonly incidentsRepository: IncidentsInterfaceRepository

	constructor(incidentsRepository: IncidentsInterfaceRepository) {
		this.incidentsRepository = incidentsRepository
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetIncidentsResponse | undefined> {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)
			if (!user) return unauthorized(reply)

			const isAdmin = user?.profile?.name === 'Admin'

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
				user.department_id,
				isAdmin,
			)

			const mappedIncidents = data.map((incident) => {
				return {
					id: incident.id,
					code: incident.code,
					title: incident.title,
					priority: { id: incident.priority.id, name: incident.priority.name },
					assigned: { id: incident?.user?.id, name: incident?.user?.name },
					status: { id: incident.status.id, name: incident.status.name },
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

	async getById(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = incidentsParamsSchema.parse(request.params)

			const incidentById = await this.incidentsRepository.findIncidentById(id)
			if (!incidentById) return notFound(reply, 'O chamado especificado não existe.')

			const news = {
				id: incidentById.id,
				code: incidentById.code,
				active: incidentById.active,
				deadline: incidentById.deadline,
				title: incidentById.title,
				description: incidentById.description,
				register: { id: incidentById.register.id, name: incidentById.register.name },
				category: { id: incidentById.category.id, name: incidentById.category.name },
				priority: { id: incidentById.priority.id, name: incidentById.priority.name },
				department: { id: incidentById.department.id, name: incidentById.department.name },
				assigned: { id: incidentById?.user?.id, name: incidentById?.user?.name },
				status: { id: incidentById.status.id, name: incidentById.status.name },
				avatars: incidentById.incidentAvatars.map((incAvatar) => ({
					id: incAvatar.id,
					avatar: `http://localhost:3002/uploads/incidents/${incAvatar.avatar}`,
				})),
				logs: incidentById.incidentLogs.map((incLog) => ({
					id: incLog.id,
					title: incLog.title,
					description: incLog.description,
				})),
				created_at: incidentById.created_at,
				updated_at: incidentById.updated_at,
			}

			return ok(reply, news)
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}

	async create(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)
			if (!user) return unauthorized(reply)

			const { title, description, department_name, category_name } = createIncidentsBodySchema.parse(request.body)
			const avatars: any = request.files

			const service = new IncidentsService()

			const createdIncident = await service.createIncidents({
				title,
				description,
				department_name,
				category_name,
				user_id: user.id,
				avatars,
			})

			return created(reply, createdIncident, 'Chamado registrado com sucesso.')
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
