import { z } from 'zod'

export const newsParamsSchema = z.object({
	id: z.string().min(1, 'ID inválido'),
})

export const createNewsBodySchema = z.object({
	title: z.string().min(1, 'Login inválido'),
	description: z.string().min(1, 'Login inválido'),
	flag_name: z.string().min(1, 'Sessão inválida'),
})

export const updateNewsBodySchema = z.object({
	title: z.string().min(1, 'Login inválido'),
	description: z.string().min(1, 'Login inválido'),
	flag_name: z.string().min(1, 'Sessão inválida'),
})
