import prismaClient from '~/config/prisma-client'

import type { GetPermissionsResponse } from '~/@types/index'

import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {
	async findPermissionsByUserId(user_id: string): Promise<GetPermissionsResponse | null> {
		const query = await prismaClient.userPermission.findMany({
			where: { user_id },
			include: {
				permission: {
					select: {
						id: true,
						name: true,
						description: true,
					},
				},
			},
		})
		return query
	}
}

const PermissionsRepository = new Repository('userPermission')

export default PermissionsRepository
