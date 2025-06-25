import type { FastifyReply, FastifyRequest } from 'fastify'

import type { NewsInterfaceRepository } from '~/models/interfaces/index'

import { internalError, notFound, ok } from '~/helpers/index'
import { newsParamsSchema } from '~/validators/index'

export class NewsByIdController {
	private readonly newsRepository: NewsInterfaceRepository

	constructor(newsRepository: NewsInterfaceRepository) {
		this.newsRepository = newsRepository
	}

	async getById(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = newsParamsSchema.parse(request.params)

			const newsById = await this.newsRepository.findNewById(id)
			if (!newsById) return notFound(reply, 'A notícia especificada não existe.')

			const news = {
				id: newsById.id,
				title: newsById.title,
				description: newsById.description,
				flag: {
					id: newsById.flag_id,
					name: newsById.flag.name,
					description: newsById.flag.description,
				},
				avatar: `http://localhost:3002/uploads/news/${newsById.avatar}`,
				active: newsById.active,
				created_at: newsById.created_at,
				updated_at: newsById.updated_at,
				deleted_at: newsById.deleted_at,
			}

			return ok(reply, news)
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
