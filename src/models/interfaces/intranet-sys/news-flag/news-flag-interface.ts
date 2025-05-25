import type { NewsFlagBaseResponse } from '~/@types/index'

interface NewsFlagInterfaceRepository {
	findOneBy(field: string | number, value: string | number | undefined): Promise<NewsFlagBaseResponse | null>
}

export type { NewsFlagInterfaceRepository }
