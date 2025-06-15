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

import type { GetUserResponse, SignInTokenResponse } from '~/@types/index'

import { internalError, unauthorized, notFound, ok } from '~/helpers/index'
import { env, signInBodySchema, userParamsSchema } from '~/validators/index'

export class UsersController {
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

	async getById(request: FastifyRequest, reply: FastifyReply): Promise<GetUserResponse | undefined> {
		try {
			const { id } = userParamsSchema.parse(request.params)

			const userById = await this.usersRepository.findUserById(id)
			if (!userById) return notFound(reply, 'O usuário especificado não existe.')

			const permissions = await this.permissionsRepository.findPermissionsByUserId(userById.id)
			if (!permissions) return notFound(reply, 'Permissões não encontradas para o usuário especificado.')

			const user = {
				id: userById.id,
				name: userById.name,
				registration: userById.registration,
				email: userById.email,
				contact: userById.contact,
				address: {
					id: userById.address?.id,
					street: userById.address?.street,
					number: userById.address?.number,
					neighborhood: userById.address?.neighborhood,
					city: userById.address?.city,
					state: userById.address?.state,
					cep: userById.address?.cep,
					complement: userById.address?.complement,
					active: userById.address?.active,
				},
				department: {
					id: userById.department?.id,
					name: userById.department?.name,
					active: userById.department?.active,
				},
				permissions: permissions?.map((permission) => ({
					id: permission.permission.id,
					name: permission.permission.name,
					description: permission.permission.description,
				})),
				active: userById.active,
				avatar: userById.avatar,
				created_at: userById.created_at,
				updated_at: userById.updated_at,
			}

			return ok(reply, user)
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
