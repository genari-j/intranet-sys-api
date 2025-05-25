import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'
import type { GetUserResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findUserById(id: string): Promise<GetUserResponse | null> {
		const query = await prismaClient.user.findFirst({
			where: { id },
			include: {
				department: true,
				address: true,
				profile: {
					include: {
						profilePermissions: true,
					},
				},
			},
		})
		return query
	}
}

const UsersRepository = new Repository('user')

export default UsersRepository
