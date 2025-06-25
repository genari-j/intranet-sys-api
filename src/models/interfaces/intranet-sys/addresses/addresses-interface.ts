import type { AddressesBaseResponse, CreateAddressBody } from '~/@types/index'

export interface AddressesInterfaceRepository {
	create(data: CreateAddressBody): Promise<AddressesBaseResponse>
	findOneBy(field: string | number, value: string | number | undefined): Promise<AddressesBaseResponse | null>
}
