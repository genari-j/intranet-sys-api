import type { FastifyReply, FastifyRequest } from 'fastify'

import type { DepartmentsInterfaceRepository } from '~/models/interfaces/index'

import { internalError, ok } from '~/helpers/index'

export class AllDepartmentsController {
	private readonly departmentsRepository: DepartmentsInterfaceRepository

	constructor(departmentsRepository: DepartmentsInterfaceRepository) {
		this.departmentsRepository = departmentsRepository
	}

	async getAll(_request: FastifyRequest, reply: FastifyReply) {
		try {
			const { payload } = await this.departmentsRepository.findAllDepartments()

			const mappedDepartments = payload?.map((d) => {
				return {
					id: d.id,
					name: d.name,
					active: d.active,
					incidentCategories: d.incidentCategories.map((c) => ({
						id: c.id,
						name: c.name,
						description: c.description,
					})),
					created_at: d.created_at,
				}
			})

			return ok(reply, mappedDepartments)
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
