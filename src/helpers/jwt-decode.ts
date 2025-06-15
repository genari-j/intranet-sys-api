import jwt from 'jsonwebtoken'
import prismaClient from '~/config/prisma-client'

import { env, bearerTokenSchema } from '~/validators/index'

export const decodeRequestAuthToken = async (token: string | undefined) => {
	try {
		const bearerToken = bearerTokenSchema.parse(token?.replace('Bearer ', ''))
		const result = jwt.verify(bearerToken, env.APP_SECRET as string)

		if (typeof result === 'object' && result !== null && 'id' in result) {
			const user = await prismaClient.user.findFirst({
				where: { id: result.id },
			})
			const permissions = await prismaClient.userPermission.findMany({
				where: { user_id: result.id },
			})

			const findedUser = {
				id: user?.id,
				name: user?.name,
				email: user?.email,
				registration: user?.registration,
				contact: user?.contact,
				department_id: user?.department_id,
				address_id: user?.address_id,
				manager_id: user?.manager_id,
				permissions,
			}

			return findedUser
		}
	} catch (err) {
		console.log(`Algo saiu como não esperado: ${err}`)
	}
}
