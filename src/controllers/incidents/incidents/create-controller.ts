import type { FastifyReply, FastifyRequest } from 'fastify'

import { IncidentsService } from '~/services/usecases/index'

import { created, decodeRequestAuthToken, internalError, unauthorized } from '~/helpers/index'
import { createIncidentsBodySchema } from '~/validators/index'

export class CreateIncidentController {
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
				user_id: user.id as string,
				avatars,
			})

			return created(reply, createdIncident, 'Chamado registrado com sucesso.')
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
