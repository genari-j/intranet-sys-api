import { z } from 'zod'

export const bearerTokenSchema = z.string().min(1, 'Token inválido')

export const userParamsSchema = z.object({
	id: z.string().min(1, 'ID inválido'),
})

export const signInBodySchema = z.object({
	registration: z.string().min(1, 'Login inválido'),
	password: z.string().min(1, 'Login inválido'),
})
