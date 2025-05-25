import type { FastifyReply, FastifyRequest } from 'fastify'

import type { NewsInterfaceRepository } from '~/models/interfaces/index'
import { type SocketService, NewsService } from '~/services/usecases/index'

import { created, internalError, ok, notFound } from '~/helpers/index'
import type { GetNewsResponse, MappedNews } from '~/@types/index'
import { newsParamsSchema, createNewsBodySchema, updateNewsBodySchema } from '~/validators/index'

export class NewsController {
	private readonly newsRepository: NewsInterfaceRepository
	private readonly socketService: SocketService

	constructor(newsRepository: NewsInterfaceRepository, socketService: SocketService) {
		this.newsRepository = newsRepository
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

	async getAll(_request: FastifyRequest, reply: FastifyReply): Promise<GetNewsResponse | undefined> {
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

	async getFlags(_request: FastifyRequest, reply: FastifyReply): Promise<GetNewsResponse | undefined> {
		try {
			const { payload } = await this.newsRepository.findAllFlags()

			const mappedNewsFlags = payload?.map((flag) => {
				return {
					id: flag.id,
					name: flag.name,
				}
			})

			return ok(reply, mappedNewsFlags)
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
