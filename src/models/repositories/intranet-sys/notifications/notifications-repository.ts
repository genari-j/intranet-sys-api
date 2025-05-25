import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetNotificationsFilters, GetNotificationsResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllUserNotifications(
		skip: number,
		take: number,
		filters: GetNotificationsFilters,
		user_id: string,
	): Promise<GetNotificationsResponse> {
		const where = {
			user_id,
			active: true,
			deleted_at: null,
			...filters,
		}

		const dataPromise = prismaClient.notification.findMany({
			where,
			orderBy: { created_at: 'desc' },
			include: {
				user: { select: { id: true, name: true } },
			},
			skip,
			take,
		})

		const countPromise = prismaClient.notification.count({ where })

		const [data, total] = await Promise.all([dataPromise, countPromise])

		return {
			data,
			total,
			pages: Math.ceil(total / take),
			currentPage: Math.floor(skip / take) + 1,
		}
	}
}

const NotificationsRepository = new Repository('notification')

export default NotificationsRepository
