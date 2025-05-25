import { z } from 'zod'

export const getNotificationsFiltersQuerySchema = z.object({
	read: z.boolean().optional(),
})

export const updateNotificationsBodySchema = z.object({
	notificationsIDs: z.array(z.string().uuid('ID inválido')).min(1, 'Pelo menos um ID deve ser informado.'),
})
