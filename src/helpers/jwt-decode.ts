import jwt from 'jsonwebtoken'
import prismaClient from '~/config/prisma-client'

import { env, bearerTokenSchema } from '~/validators/index'

export const decodeRequestAuthToken = async (token: string | undefined) => {
	try {
		const bearerToken = bearerTokenSchema.parse(token?.replace('Bearer ', ''))
		const result = jwt.verify(bearerToken, env.APP_SECRET as string)

		if (typeof result === 'object' && result !== null && 'id' in result) {
			const userById = await prismaClient.user.findFirst({
				where: { id: result.id },
			})
			const permissions = await prismaClient.userPermission.findMany({
				where: {
					user_id: result.id,
				},
				include: {
					permission: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			})

			const user = {
				id: userById?.id,
				name: userById?.name,
				email: userById?.email,
				registration: userById?.registration,
				contact: userById?.contact,
				department_id: userById?.department_id,
				address_id: userById?.address_id,
				manager_id: userById?.manager_id,
				permissions,
			}

			return user
		}
	} catch (err) {
		console.log(`Algo saiu como não esperado: ${err}`)
	}
}
