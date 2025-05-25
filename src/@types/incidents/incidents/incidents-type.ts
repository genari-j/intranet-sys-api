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
