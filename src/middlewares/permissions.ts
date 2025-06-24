import type { FastifyReply, FastifyRequest } from 'fastify'
import { decodeRequestAuthToken, unauthorized } from '~/helpers/index'

export const permsMiddleware = (requiredPerms: string[]) => {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { authorization } = request.headers
		const decodedUser = await decodeRequestAuthToken(authorization)
		if (!decodedUser) return unauthorized(reply)

		const userPermissions = decodedUser.permissions.map((perm) => perm.permission.name)
		const checkPermissions = requiredPerms.every((perm) => userPermissions.includes(perm))
		if (!checkPermissions) return unauthorized(reply)
	}
}

export const allowedPersonalIncidents = ['Visualizar chamados específicos']
