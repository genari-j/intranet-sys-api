import type { FastifyReply, FastifyRequest } from 'fastify'

import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import type {
	UsersInterfaceRepository,
	AddressesInterfaceRepository,
	DepartmentsInterfaceRepository,
	PermissionsInterfaceRepository,
	SigninLogsInterfaceRepository,
} from '~/models/interfaces/index'

import type { SignInTokenResponse } from '~/@types/index'

import { internalError, unauthorized, ok } from '~/helpers/index'
import { env, signInBodySchema } from '~/validators/index'

export class SignInController {
	private readonly usersRepository: UsersInterfaceRepository
	private readonly addressesRepository: AddressesInterfaceRepository
	private readonly departmentsRepository: DepartmentsInterfaceRepository
	private readonly permissionsRepository: PermissionsInterfaceRepository
	private readonly signinHistoryRepository: SigninLogsInterfaceRepository

	constructor(
		usersRepository: UsersInterfaceRepository,
		addressesRepository: AddressesInterfaceRepository,
		departmentsRepository: DepartmentsInterfaceRepository,
		permissionsRepository: PermissionsInterfaceRepository,
		signinHistoryRepository: SigninLogsInterfaceRepository,
	) {
		this.usersRepository = usersRepository
		this.addressesRepository = addressesRepository
		this.departmentsRepository = departmentsRepository
		this.permissionsRepository = permissionsRepository
		this.signinHistoryRepository = signinHistoryRepository
	}

	async signIn(request: FastifyRequest, reply: FastifyReply): Promise<SignInTokenResponse | undefined> {
		try {
			const { registration, password } = signInBodySchema.parse(request.body)

			const user = await this.usersRepository.findOneBy('registration', registration)
			if (!user || user.active !== true || user.deleted_at !== null) return unauthorized(reply)

			const compareUserPassword = await bcryptjs.compare(String(password), String(user.password))
			if (!compareUserPassword) return unauthorized(reply)

			const address = await this.addressesRepository.findOneBy('id', user.address_id)
			const department = await this.departmentsRepository.findOneBy('id', user.department_id)
			const permissions = await this.permissionsRepository.findPermissionsByUserId(user.id)

			const token = jwt.sign(
				{
					id: user.id,
					name: user.name,
					registration: user.registration,
					email: user.email,
					contact: user.contact,
					address: {
						id: address?.id,
						street: address?.street,
						number: address?.number,
						neighborhood: address?.neighborhood,
						city: address?.city,
						state: address?.state,
						cep: address?.cep,
						complement: address?.complement,
						active: address?.active,
					},
					department: {
						id: department?.id,
						name: department?.name,
						active: department?.active,
					},
					permissions: permissions?.map((permission) => ({
						id: permission.permission.id,
						name: permission.permission.name,
						description: permission.permission.description,
					})),
					active: user.active,
					avatar: user.avatar,
					created_at: user.created_at,
					updated_at: user.updated_at,
				},
				env.APP_SECRET as string,
				{ expiresIn: '12h' },
			)

			await this.signinHistoryRepository.create({ user_id: user.id })

			const generateToken = { token }

			return ok(reply, generateToken, 'Login efetuado com sucesso.')
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
