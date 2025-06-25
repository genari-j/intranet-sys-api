import type { FastifyReply, FastifyRequest } from 'fastify'

import type { PointBaseResponse, UpdatePointBody } from '~/@types/index'
import type { HumanResourcesPointsInterfaceRepository } from '../../../models/interfaces/human-resources/points/points-interface'

import { created, decodeRequestAuthToken, fail, internalError, ok, unauthorized } from '~/helpers/index'
import { createOrUpdatePointBodySchema } from '~/validators/index'

export class CreatePointController {
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

			const points = await this.humanResourcesPointsRepository.findUserPoints(user.id as string)
			const lastPoint = points[0]

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
				user_id: user.id as string,
				entry: date,
			}

			const pointCreated = await this.humanResourcesPointsRepository.create(payload)

			return created(reply, pointCreated, 'Ponto registrado com sucesso.')
		} catch (err) {
			return internalError(reply, `Algo saiu como não esperado: ${err}`)
		}
	}
}
