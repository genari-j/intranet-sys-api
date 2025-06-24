import type { FastifyReply, FastifyRequest } from 'fastify'

import { type SocketService, NewsService } from '~/services/usecases/index'

import { created, internalError } from '~/helpers/index'
import { createNewsBodySchema } from '~/validators/index'

export class CreateNewsController {
	private readonly socketService: SocketService

	constructor(socketService: SocketService) {
		this.socketService = socketService
	}

	async create(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { title, description, flag_name } = createNewsBodySchema.parse(request.body)
			const avatar: any = request.file

			const service = new NewsService(this.socketService)

			const createdNews = await service.createNews({
				title,
				description,
				flag_name,
				avatar,
			})

			return created(reply, createdNews, 'Notícia registrada com sucesso.')
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
