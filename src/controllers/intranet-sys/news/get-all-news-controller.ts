import type { FastifyReply, FastifyRequest } from 'fastify'

import type { NewsInterfaceRepository } from '~/models/interfaces/index'

import type { MappedNews } from '~/@types/index'
import { internalError, ok } from '~/helpers/index'

export class AllNewsController {
	private readonly newsRepository: NewsInterfaceRepository

	constructor(newsRepository: NewsInterfaceRepository) {
		this.newsRepository = newsRepository
	}

	async getAll(_request: FastifyRequest, reply: FastifyReply) {
		try {
			const { payload } = await this.newsRepository.findAllNews()

			const mapNews = (news: MappedNews) => ({
				id: news.id,
				title: news.title,
				description: news.description,
				avatar: `http://localhost:3002/uploads/news/${news.avatar}`,
				active: news.active,
				flag: {
					id: news.flag.id,
					name: news.flag.name,
					description: news.flag.description,
				},
				created_at: news.created_at,
				updated_at: news.updated_at,
			})

			const mappedNews = {
				hero: payload.hero.map(mapNews),
				medium: payload.medium.map(mapNews),
				simple: payload.simple.map(mapNews),
			}

			return ok(reply, mappedNews)
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
