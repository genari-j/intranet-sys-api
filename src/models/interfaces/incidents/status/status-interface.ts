import type { GetStatusResponse } from '~/@types/index'

export interface StatusInterfaceRepository {
	findOneBy(field: string | number, value: string | number | undefined): Promise<GetStatusResponse | null>
}
