import { z } from 'zod'

export const getNotificationsFiltersQuerySchema = z.object({
	read: z
		.preprocess((val) => {
			if (val === 'true') return true
			if (val === 'false') return false
			return val
		}, z.boolean())
		.optional(),
})

export const updateNotificationsBodySchema = z.object({
	notificationsIDs: z.array(z.string().uuid('ID inválido')).min(1, 'Pelo menos um ID deve ser informado.'),
})
