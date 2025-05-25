import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetPointsFilters, GetPointsResponse, PointBaseResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findUserPoints(user_id: string): Promise<PointBaseResponse[]> {
		const query = await prismaClient.humanResourcesPoint.findMany({
			orderBy: {
				created_at: 'desc',
			},
			where: {
				user_id: user_id,
				active: true,
				deleted_at: null,
			},
		})

		return query
	}

	async findAllUserPoints(
		skip: number,
		take: number,
		filters: GetPointsFilters,
		user_id: string,
	): Promise<GetPointsResponse> {
		const where = {
			user_id,
			active: true,
			deleted_at: null,
			...filters,
		}

		const dataPromise = prismaClient.humanResourcesPoint.findMany({
			where,
			orderBy: { created_at: 'desc' },
			include: {
				user: { select: { id: true, name: true } },
			},
			skip,
			take,
		})

		const countPromise = prismaClient.humanResourcesPoint.count({ where })

		const [data, total] = await Promise.all([dataPromise, countPromise])

		return {
			data,
			total,
			pages: Math.ceil(total / take),
			currentPage: Math.floor(skip / take) + 1,
		}
	}
}

const HumanResourcesPointsRepository = new Repository('humanResourcesPoint')

export default HumanResourcesPointsRepository
