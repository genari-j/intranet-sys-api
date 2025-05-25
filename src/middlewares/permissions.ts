import type { FastifyReply, FastifyRequest } from 'fastify'
import { decodeRequestAuthToken, forbidden, unauthorized } from '~/helpers/index'

export const adminRoutes = ['FAQ', 'Dashboard', 'Register News', 'Edit News']
export const managerRoutes = ['FAQ', 'Register News']
export const funRoutes = ['Systems']

export const roles = {
	admin: ['FAQ', 'Dashboard', 'Register News', 'Edit News'],
	manager: ['FAQ', 'Register News'],
	user: ['Systems'],
}

interface PermissionOptions {
	requiredPermissions?: string[]
	requiredRole?: keyof typeof roles
}

export const permMiddleware = ({ requiredPermissions = [], requiredRole }: PermissionOptions) => {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		const { authorization } = request.headers
		const user = await decodeRequestAuthToken(authorization)
		if (!user) return unauthorized(reply)

		const userPermissions = user.profile.profilePermissions.map((perm) => perm.permission)

		const hasPermissions = (required: string[]) => required.every((perm) => userPermissions.includes(perm))

		if (requiredRole) {
			const rolePermissions = roles[requiredRole]
			if (!hasPermissions(rolePermissions)) {
				return forbidden(reply, 'Você não possui permissão para acessar essa funcionalidade.')
			}
		}

		if (requiredPermissions.length > 0 && !hasPermissions(requiredPermissions)) {
			return forbidden(reply, 'Você não possui as permissões necessárias para acessar essa rota.')
		}

		return
	}
}
