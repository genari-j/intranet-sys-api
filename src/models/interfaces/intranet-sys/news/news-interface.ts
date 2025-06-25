import type {
	CreateNewsBody,
	GetNewResponse,
	GetNewsFlagsResponse,
	GetNewsResponse,
	NewBaseResponse,
	UpdateNewsBody,
} from '~/@types/index'

interface NewsInterfaceRepository {
	create(data: CreateNewsBody): Promise<NewBaseResponse>
	findAllNews(): Promise<GetNewsResponse>
	findNewById(id: string): Promise<GetNewResponse | null>
	findAllFlags(): Promise<GetNewsFlagsResponse>
	findOneBy(field: string | number, value: string | number | undefined): Promise<NewBaseResponse | null>
	findByIdAndUpdate(id: string, payload: {}): Promise<UpdateNewsBody | null>
	findDifferentNewsByTitle(id: string, name: string): Promise<NewBaseResponse | null>
}

export type { NewsInterfaceRepository }
