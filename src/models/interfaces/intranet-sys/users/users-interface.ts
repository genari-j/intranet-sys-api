import type { CreateUserBody, UserBaseResponse, GetUserResponse } from '~/@types/index'

interface UsersInterfaceRepository {
	create(data: CreateUserBody): Promise<UserBaseResponse>
	findOneBy(field: string | number, value: string | number | undefined): Promise<UserBaseResponse | null>
	findUserById(id: string): Promise<GetUserResponse | null>
}

export type { UsersInterfaceRepository }
