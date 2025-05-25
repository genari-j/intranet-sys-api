import type { Prisma } from '@prisma/client'

export type ProfilesWithFKeyResponse = Prisma.ProfileGetPayload<{
	include: {
		profilePermissions: true
	}
}>

export type GetProfilesResponse = ProfilesWithFKeyResponse
