import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetIncidentsFilters, GetIncidentsResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllIncidents(
		skip: number,
		take: number,
		filters: GetIncidentsFilters,
		department_id: string,
		isAdmin: boolean,
	): Promise<GetIncidentsResponse> {
		const where = {
			active: true,
			deleted_at: null,
			...(isAdmin ? {} : { department_id }),
			...filters,
		}

		const dataPromise = prismaClient.incident.findMany({
			where,
			orderBy: { created_at: 'desc' },
			include: {
				priority: { select: { id: true, name: true } },
				status: { select: { id: true, name: true } },
				user: { select: { id: true, name: true } },
			},
			skip,
			take,
		})

		const countPromise = prismaClient.incident.count({ where })

		const [data, total] = await Promise.all([dataPromise, countPromise])

		return {
			data,
			total,
			pages: Math.ceil(total / take),
			currentPage: Math.floor(skip / take) + 1,
		}
	}
}

const IncidentsRepository = new Repository('incident')

export default IncidentsRepository
