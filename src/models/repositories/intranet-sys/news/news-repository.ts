import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type {
	GetNewsResponse,
	GetNewResponse,
	BaseCategorizedNews,
	GetNewsFlagsResponse,
	NewBaseResponse,
} from '~/@types/index'

class Repository extends RestRepository {
	async findAllNews(): Promise<GetNewsResponse> {
		const query: BaseCategorizedNews[] = await prismaClient.news.findMany({
			orderBy: {
				created_at: 'desc',
			},
			where: {
				active: true,
				deleted_at: null,
			},
			include: {
				flag: true,
			},
		})

		const categorizedNews = {
			hero: [] as BaseCategorizedNews[],
			medium: [] as BaseCategorizedNews[],
			simple: [] as BaseCategorizedNews[],
		}

		for (let i = 0; i < query.length; i++) {
			const news = query[i]

			if (news.flag.name.includes('Principal')) categorizedNews.hero.push(news)
			if (news.flag.name.includes('Mediana')) categorizedNews.medium.push(news)
			if (news.flag.name.includes('Simples')) categorizedNews.simple.push(news)
		}

		return {
			payload: categorizedNews,
		}
	}

	async findNewById(id: string): Promise<GetNewResponse | null> {
		const query = await prismaClient.news.findFirst({
			where: { id },
			include: {
				flag: {
					select: {
						id: true,
						name: true,
						description: true,
					},
				},
			},
		})
		return query
	}

	async findAllFlags(): Promise<GetNewsFlagsResponse> {
		const query = await prismaClient.newsFlag.findMany({
			orderBy: {
				created_at: 'desc',
			},
			where: {
				active: true,
				deleted_at: null,
			},
		})

		return {
			payload: query,
		}
	}

	async findDifferentNewsByTitle(id: string, title: string): Promise<NewBaseResponse | null> {
		const query = await prismaClient.news.findFirst({
			where: {
				title: title,
				id: {
					not: id,
				},
			},
		})
		return query
	}
}

const NewsRepository = new Repository('news')

export default NewsRepository
