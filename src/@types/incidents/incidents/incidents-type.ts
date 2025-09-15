import type { Prisma } from '@prisma/client'

export interface GetIncidentsFilters {
	code?: string
	status_id?: string
	priority_id?: string
	assigned_id?: string
	created_at?: Date
}

export type IncidentBaseResponse = {
	id: string
	code: string
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

export type Avatar = {
	originalname: string
	filename: string
	fieldname: string
	destination: string
	path: string
	encoding: string
	mimetype: string
	size: number
}

export type CreateIncidentsParams = {
	title: string
	description: string
	department_name: string
	category_name: string
	user_id: string
	avatars: Avatar[]
}

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
				field: true
				old_value: true
				new_value: true
				user: {
					select: {
						id: true
						name: true
						department: {
							select: {
								id: true
								name: true
							}
						}
					}
				}
				created_at: true
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
