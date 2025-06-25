import type { GetIncidentResponse, GetIncidentsFilters, GetIncidentsResponse } from '~/@types/index'

export interface IncidentsInterfaceRepository {
	findAllIncidents(
		skip: number,
		limit: number,
		filters: GetIncidentsFilters,
		user_id: string,
		isAdmin: boolean,
	): Promise<GetIncidentsResponse>
	findIncidentById(id: string): Promise<GetIncidentResponse | null>
}
