import type { CreatePointBody, GetPointsFilters, GetPointsResponse, PointBaseResponse } from '~/@types/index'

export interface HumanResourcesPointsInterfaceRepository {
	create(data: CreatePointBody): Promise<PointBaseResponse>
	findUserPoints(user_id: string): Promise<PointBaseResponse[]>
	findAllUserPoints(skip: number, limit: number, filters: GetPointsFilters, user_id: string): Promise<GetPointsResponse>
	findByIdAndUpdate(id: string, payload: {}): Promise<PointBaseResponse | null>
}
