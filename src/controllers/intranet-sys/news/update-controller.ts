import type { FastifyReply, FastifyRequest } from 'fastify'

import { NewsService, type SocketService } from '~/services/usecases/index'

import { internalError, ok } from '~/helpers/index'
import { newsParamsSchema, updateNewsBodySchema } from '~/validators/index'

export class UpdateNewsController {
	private readonly socketService: SocketService

	constructor(socketService: SocketService) {
		this.socketService = socketService
	}

	async update(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = newsParamsSchema.parse(request.params)
			const { title, description, flag_name } = updateNewsBodySchema.parse(request.body)
			const avatar: any = request.file

			const service = new NewsService(this.socketService)

			const updatedNews = await service.updateNews({
				id,
				title,
				description,
				flag_name,
				avatar,
			})

			return ok(reply, updatedNews, 'Notícia atualizada com sucesso.')
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
