import type { Prisma } from '@prisma/client'

export type PermissionsWithFKeyResponse = Prisma.UserPermissionGetPayload<{
	include: {
		permission: {
			select: {
				id: true
				name: true
				description: true
			}
		}
	}
}>

export type GetPermissionsResponse = PermissionsWithFKeyResponse[]
