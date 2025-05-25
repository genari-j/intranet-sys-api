import type { GetPrioritiesResponse } from '~/@types/index'

export interface PrioritiesInterfaceRepository {
	findOneBy(field: string | number, value: string | number | undefined): Promise<GetPrioritiesResponse | null>
}
