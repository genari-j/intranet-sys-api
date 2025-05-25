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
				include: {
					profile: {
						include: {
							profilePermissions: true,
						},
					},
				},
			})

			return user
		}
	} catch (err) {
		console.log(`Algo saiu como não esperado: ${err}`)
	}
}
