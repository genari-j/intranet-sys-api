import type { GetIncidentsFilters, GetIncidentsResponse } from '~/@types/index'

export interface IncidentsInterfaceRepository {
	findAllIncidents(
		skip: number,
		limit: number,
		filters: GetIncidentsFilters,
		user_id: string,
	): Promise<GetIncidentsResponse>
}
