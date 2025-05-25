export interface GetStatusResponse {
	id: string
	name: string
	description: string
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}
