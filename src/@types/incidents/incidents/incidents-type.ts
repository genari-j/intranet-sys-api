import type { Prisma } from '@prisma/client'

export interface GetIncidentsFilters {
	code?: number
	status_id?: string
	priority_id?: string
	assigned_id?: string
	created_at?: Date
}

export type IncidentBaseResponse = {
	id: string
	code: number
	title: string
	description: string
	register_by: string
	department_id: string
	priority_id: string
	status_id: string
	category_id: string
	assigned_id?: string | null
	deadline?: Date | null
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateIncidentsBody = Omit<
	IncidentBaseResponse,
	'id' | 'assigned_id' | 'deadline' | 'active' | 'created_at' | 'updated_at' | 'deleted_at'
>

export type IncidentsWithFKeyResponse = Prisma.IncidentGetPayload<{
	include: {
		priority: {
			select: {
				id: true
				name: true
			}
		}
		status: {
			select: {
				id: true
				name: true
			}
		}
		user: {
			select: {
				id: true
				name: true
			}
		}
	}
}>

export type IncidentWithFKeyResponse = Prisma.IncidentGetPayload<{
	include: {
		priority: {
			select: {
				id: true
				name: true
			}
		}
		status: {
			select: {
				id: true
				name: true
			}
		}
		user: {
			select: {
				id: true
				name: true
			}
		}
		category: {
			select: {
				id: true
				name: true
			}
		}
		department: {
			select: {
				id: true
				name: true
			}
		}
		register: {
			select: {
				id: true
				name: true
			}
		}
		incidentAvatars: {
			select: {
				id: true
				avatar: true
			}
		}
		incidentLogs: {
			select: {
				id: true
				title: true
				description: true
			}
		}
	}
}>

export interface GetIncidentsResponse {
	data: IncidentsWithFKeyResponse[]
	total: number
	pages: number
	currentPage: number
}

export type GetIncidentResponse = IncidentWithFKeyResponse
