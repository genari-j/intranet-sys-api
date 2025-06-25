import type { FastifyReply, FastifyRequest } from 'fastify'

import type { PermissionsInterfaceRepository, UsersInterfaceRepository } from '~/models/interfaces/index'

import type { GetUserResponse } from '~/@types/index'

import { internalError, notFound, ok } from '~/helpers/index'
import { userParamsSchema } from '~/validators/index'

export class UserByIdController {
	private readonly usersRepository: UsersInterfaceRepository
	private readonly permissionsRepository: PermissionsInterfaceRepository

	constructor(usersRepository: UsersInterfaceRepository, permissionsRepository: PermissionsInterfaceRepository) {
		this.usersRepository = usersRepository
		this.permissionsRepository = permissionsRepository
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
