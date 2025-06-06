import type { DepartmentBaseResponse } from '~/@types/index'

export interface DepartmentsInterfaceRepository {
	findOneBy(field: string | number, value: string | number | undefined): Promise<DepartmentBaseResponse | null>
}
