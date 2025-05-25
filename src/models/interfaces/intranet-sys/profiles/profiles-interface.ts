import type { GetProfilesResponse } from '~/@types/index'

export interface ProfilesInterfaceRepository {
	findProfileById(id: string): Promise<GetProfilesResponse | null>
}
