import prismaClient from '~/config/prisma-client'

import type { GetUserResponse } from '~/@types/index'
import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {
	async findUserById(id: string): Promise<GetUserResponse | null> {
		const query = await prismaClient.user.findFirst({
			where: { id },
			include: {
				department: true,
				address: true,
			},
		})
		return query
	}
}

const UsersRepository = new Repository('user')

export default UsersRepository
