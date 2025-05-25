import { z } from 'zod'

export const getHumanResourcesPointsFiltersQuerySchema = z.object({
	date: z.date().optional(),
})

export const createOrUpdatePointBodySchema = z.object({
	date: z
		.string()
		.min(1, 'Data inválida')
		.transform((date) => new Date(date)),
})
