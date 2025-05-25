export type NewBaseResponse = {
	id: string
	title: string
	description: string
	flag_id: string
	active: boolean
	avatar: string | null
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export type CreateNewsBody = Omit<NewBaseResponse, 'id' | 'active' | 'created_at' | 'updated_at' | 'deleted_at'>

export type UpdateNewsBody = Partial<
	Omit<NewBaseResponse, 'id' | 'active' | 'created_at' | 'updated_at' | 'deleted_at'>
>

export type BaseCategorizedNews = {
	id: string
	title: string
	description: string
	flag_id: string
	flag: {
		id: string
		name: string
		description: string
	}
	avatar: string | null
	active: boolean
	created_at: Date | string
	updated_at: Date | string
	deleted_at: Date | string | null
}

type CategorizedNews = {
	hero: BaseCategorizedNews[]
	medium: BaseCategorizedNews[]
	simple: BaseCategorizedNews[]
}

export interface GetNewsResponse {
	payload: CategorizedNews
}

export type GetNewResponse = BaseCategorizedNews

export type MappedNews = {
	id: string
	title: string
	description: string
	avatar: string | null
	active: boolean
	flag: {
		id: string
		name: string
		description: string
	}
	created_at: Date | string
	updated_at: Date | string
}

// FLAGS
export type FlagsBaseResponse = {
	id: string
	name: string
	description: string
	active: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date | null
}

export interface GetNewsFlagsResponse {
	payload: FlagsBaseResponse[]
}
