import type { GetNotificationsFilters, GetNotificationsResponse } from '~/@types/index'

export interface NotificationsInterfaceRepository {
	findAllUserNotifications(
		skip: number,
		limit: number,
		filters: GetNotificationsFilters,
		user_id: string,
	): Promise<GetNotificationsResponse>
}
