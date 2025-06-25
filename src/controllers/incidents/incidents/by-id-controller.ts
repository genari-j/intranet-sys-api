import type { FastifyReply, FastifyRequest } from 'fastify'

import type { IncidentsInterfaceRepository } from '~/models/interfaces/index'

import { internalError, notFound, ok } from '~/helpers/index'
import { incidentsParamsSchema } from '~/validators/index'

export class IncidentByIdController {
	private readonly incidentsRepository: IncidentsInterfaceRepository

	constructor(incidentsRepository: IncidentsInterfaceRepository) {
		this.incidentsRepository = incidentsRepository
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
}
