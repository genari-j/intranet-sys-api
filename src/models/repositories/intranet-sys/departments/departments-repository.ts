import prismaClient from '~/config/prisma-client'

import { RestRepository } from '~/models/repositories/index'

import type { GetDepartmentsResponse } from '~/@types/index'

class Repository extends RestRepository {
	async findAllDepartments(): Promise<GetDepartmentsResponse> {
		const query = await prismaClient.department.findMany({
			orderBy: {
				created_at: 'desc',
			},
			where: {
				active: true,
				deleted_at: null,
			},
			include: {
				incidentCategories: true,
			},
		})

		return {
			payload: query,
		}
	}
}

const DepartmentsRepository = new Repository('department')

export default DepartmentsRepository
