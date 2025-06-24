import type { FastifyReply, FastifyRequest } from 'fastify'

import type { NewsInterfaceRepository } from '~/models/interfaces/index'

import { internalError, ok } from '~/helpers/index'

export class AllFlagsController {
	private readonly newsRepository: NewsInterfaceRepository

	constructor(newsRepository: NewsInterfaceRepository) {
		this.newsRepository = newsRepository
	}

	async getFlags(_request: FastifyRequest, reply: FastifyReply) {
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
