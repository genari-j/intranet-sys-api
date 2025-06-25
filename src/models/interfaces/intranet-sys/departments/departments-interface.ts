import type { DepartmentBaseResponse, GetDepartmentsResponse } from '~/@types/index'

export interface DepartmentsInterfaceRepository {
	findAllDepartments(): Promise<GetDepartmentsResponse>
	findOneBy(field: string | number, value: string | number | undefined): Promise<DepartmentBaseResponse | null>
}
