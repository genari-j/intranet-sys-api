import prismaClient from '~/config/prisma-client'

import type { GetProfilesResponse } from '~/@types/index'

import { RestRepository } from '~/models/repositories/index'

class Repository extends RestRepository {
	async findProfileById(id: string): Promise<GetProfilesResponse | null> {
		const query = await prismaClient.profile.findFirst({
			where: { id },
			include: {
				profilePermissions: true,
			},
		})
		return query
	}
}

const ProfilesRepository = new Repository('profiles')

export default ProfilesRepository
