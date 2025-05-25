import type { CreateSigninLogsBody, GetSigninLogsResponse } from '~/@types/index'

export interface SigninLogsInterfaceRepository {
	create(data: CreateSigninLogsBody): Promise<GetSigninLogsResponse | null>
}
