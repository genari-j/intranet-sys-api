import type { FastifyReply, FastifyRequest } from 'fastify'

import { IncidentsService } from '~/services/usecases/index'

import { decodeRequestAuthToken, unauthorized, created, internalError } from '~/helpers/index'
import { createIncidentsBodySchema } from '~/validators/index'

export class IncidentsController {
	async create(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)
			if (!user) return unauthorized(reply)

			const { title, description, department_name, category_name } = createIncidentsBodySchema.parse(request.body)
			const avatars: any = request.files

			const service = new IncidentsService()

			const createdIncidents = await service.createIncidents({
				title,
				description,
				department_name,
				category_name,
				user_id: user.id,
				avatars,
			})

			return created(reply, createdIncidents, 'Chamado registrado com sucesso.')
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
