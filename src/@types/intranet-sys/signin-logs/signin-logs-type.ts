export type GetSigninLogsResponse = {
	id: string
	user_id: string
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateSigninLogsBody = Omit<GetSigninLogsResponse, 'id' | 'created_at' | 'updated_at' | 'deleted_at'>
