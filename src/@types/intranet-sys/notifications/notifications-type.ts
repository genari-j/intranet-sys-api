import type { Prisma } from '@prisma/client'

export interface GetNotificationsFilters {
	read?: boolean
}

export type NotificationWithFKeyResponse = Prisma.NotificationGetPayload<{
	include: {
		user: {
			select: {
				id: true
				name: true
			}
		}
	}
}>

export interface GetNotificationsResponse {
	data: NotificationWithFKeyResponse[]
	total: number
	pages: number
	currentPage: number
}
