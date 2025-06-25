import type { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'

import { ok } from '~/helpers/index'

const baseRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
	fastify.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
		return ok(reply, 'API is running 🚀')
	})
}

export default baseRoute
