import type { Prisma } from '@prisma/client'

export interface GetPointsFilters {
	date?: Date
}

export type PointBaseResponse = {
	id: string
	user_id: string
	entry: Date
	lunch_out: Date | null
	lunch_return: Date | null
	departure: Date | null
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreatePointBody = Omit<
	PointBaseResponse,
	'id' | 'lunch_out' | 'lunch_return' | 'departure' | 'active' | 'created_at' | 'updated_at' | 'deleted_at'
>

export type UpdatePointBody = Partial<
	Omit<PointBaseResponse, 'id' | 'user_id' | 'entry' | 'active' | 'created_at' | 'updated_at' | 'deleted_at'>
>

export type PointWithFKeyResponse = Prisma.HumanResourcesPointGetPayload<{
	include: {
		user: {
			select: {
				id: true
				name: true
			}
		}
	}
}>

export interface GetPointsResponse {
	data: PointWithFKeyResponse[]
	total: number
	pages: number
	currentPage: number
}

export type GetPointResponse = PointWithFKeyResponse
