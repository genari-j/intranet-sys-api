import prismaClient from '~/config/prisma-client'

export class RestRepository {
	public readonly entity: string

	constructor(entity: string) {
		this.entity = entity
	}

	async create(data: {} = {}, client = prismaClient) {
		const query = await (client as Record<string, any>)[this.entity].create({
			data,
		})
		return query
	}

	async findOneBy(field: string | number, value: string | number, client = prismaClient) {
		if (!field || !value) {
			throw new Error('Campos não especificados.')
		}

		const query = await (client as Record<string, any>)[this.entity].findFirst({
			where: { [field]: value },
		})

		return query
	}

	async findAll(client = prismaClient) {
		const query = await (client as Record<string, any>)[this.entity].findMany({
			where: {
				active: true,
				deleted_at: null,
			},
		})

		return query
	}

	async findByIdAndUpdate(id: string, data: {} = {}, client = prismaClient) {
		if (!id) {
			throw new Error('ID não informado.')
		}

		const query = await (client as Record<string, any>)[this.entity].update({
			where: { id },
			data,
		})

		return query
	}
}
