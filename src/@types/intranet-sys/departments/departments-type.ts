import type { Prisma } from '@prisma/client'

export interface DepartmentBaseResponse {
	id: string
	name: string
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type DepartmentWithFKeyResponse = Prisma.DepartmentGetPayload<{
	include: {
		incidentCategories: true
	}
}>

export interface GetDepartmentsResponse {
	payload: DepartmentWithFKeyResponse[]
}
