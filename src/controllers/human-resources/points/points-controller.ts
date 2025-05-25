import type { FastifyReply, FastifyRequest } from 'fastify'

import type { HumanResourcesPointsInterfaceRepository } from '../../../models/interfaces/human-resources/points/points-interface'
import type { PointBaseResponse, UpdatePointBody, GetPointsResponse } from '~/@types/index'

import { decodeRequestAuthToken, ok, created, unauthorized, fail, internalError } from '~/helpers/index'
import { env, createOrUpdatePointBodySchema, getHumanResourcesPointsFiltersQuerySchema } from '~/validators/index'

export class HumanResourcesPointsController {
	private readonly humanResourcesPointsRepository: HumanResourcesPointsInterfaceRepository

	constructor(humanResourcesPointsRepository: HumanResourcesPointsInterfaceRepository) {
		this.humanResourcesPointsRepository = humanResourcesPointsRepository
	}

	async create(request: FastifyRequest, reply: FastifyReply) {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)
			if (!user) return unauthorized(reply)

			const { date } = createOrUpdatePointBodySchema.parse(request.body)

			const points = await this.humanResourcesPointsRepository.findUserPoints(user.id)
			const lastPoint = points[0]

			// TODO: Verificar se terá real a necessidade de usar o UTC
			// EX: getUTCDate, getUTCMonth, getFullYear
			const isSameDay = (d1: Date, d2: Date) =>
				d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()

			const isSameDayAndHasEntry = lastPoint && isSameDay(lastPoint.created_at, date) && lastPoint.entry

			if (isSameDayAndHasEntry) {
				const getCurrentStep = (lastPoint: PointBaseResponse, today: Date) => {
					if (!lastPoint || !isSameDay(lastPoint.created_at, today)) return 'entry'
					if (lastPoint.lunch_out === null) return 'lunch_out'
					if (lastPoint.lunch_return === null) return 'lunch_return'
					if (lastPoint.departure === null) return 'departure'
					return 'done'
				}

				const step = getCurrentStep(lastPoint, date)
				const updatedPayload: UpdatePointBody = {}

				switch (step) {
					case 'lunch_out':
						updatedPayload.lunch_out = date
						break
					case 'lunch_return':
						updatedPayload.lunch_return = date
						break
					case 'departure':
						updatedPayload.departure = date
						break
					default:
						return fail(reply, 'Os registros do dia de hoje já foram finalizados.')
				}

				const updatedPoint = await this.humanResourcesPointsRepository.findByIdAndUpdate(lastPoint.id, updatedPayload)

				return ok(reply, updatedPoint, 'Ponto atualizado com sucesso.')
			}

			const payload = {
				user_id: user.id,
				entry: date,
			}

			const pointCreated = await this.humanResourcesPointsRepository.create(payload)

			return created(reply, pointCreated, 'Ponto registrado com sucesso.')
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}

	async getAll(request: FastifyRequest, reply: FastifyReply): Promise<GetPointsResponse | undefined> {
		try {
			const { authorization } = request.headers
			const user = await decodeRequestAuthToken(authorization)
			if (!user) return unauthorized(reply)

			const query = request.query as {
				page?: string
				limit?: string
				date?: string
			}

			const page = Number(query.page ?? env.INITIAL_DATA_OFFSET)
			const limit = Number(query.limit ?? env.LIST_PER_PAGE)
			const skip = (page - 1) * limit

			const filters = getHumanResourcesPointsFiltersQuerySchema.parse(query)

			const { data, total, pages, currentPage } = await this.humanResourcesPointsRepository.findAllUserPoints(
				skip,
				Number(limit),
				filters,
				user.id,
			)

			const mappedUserPoints = data.map((point) => {
				return {
					id: point.id,
					entry: point.entry,
					lunch_out: point.lunch_out,
					lunch_return: point.lunch_return,
					departure: point.departure,
					user: {
						user_id: point.user.id,
						name: point.user.name,
					},
					active: point.active,
					created_at: point.created_at,
					updated_at: point.updated_at,
					deleted_at: point.deleted_at,
				}
			})

			return ok(reply, {
				data: mappedUserPoints,
				pagination: {
					limit: Number(limit),
					total,
					pages,
					currentPage,
				},
			})
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
