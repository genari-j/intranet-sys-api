import type { GetPermissionsResponse } from '~/@types/index'

export interface PermissionsInterfaceRepository {
	findPermissionsByUserId(user_id: string): Promise<GetPermissionsResponse | null>
}
