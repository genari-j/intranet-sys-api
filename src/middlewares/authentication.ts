import type { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

import { env } from '~/validators/index'
import { fail, unauthorized } from '~/helpers/index'

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
	const bearerToken = request.headers.authorization

	if (!bearerToken) {
		return unauthorized(reply)
	}

	const [, token] = bearerToken.split(' ')

	try {
		jwt.verify(token, env.APP_SECRET as string)
		return
	} catch (error) {
		return fail(reply, `Ocorreu algum erro relacionado ao middleware de autenticação: ${error}`)
	}
}
