import { z } from 'zod'

export const incidentsParamsSchema = z.object({
	id: z.string().min(1, 'ID inválido'),
})

export const getIncidentsFiltersQuerySchema = z.object({
	code: z.number().optional(),
	status_id: z.string().optional(),
	priority_id: z.string().optional(),
	assigned_id: z.string().optional(),
	created_at: z.date().optional(),
})

export const createIncidentsBodySchema = z.object({
	title: z.string().min(1, 'Título inválido'),
	description: z.string().min(1, 'Descrição inválida'),
	department_name: z.string().min(1, 'Departamento atendente inválido'),
	category_name: z.string().min(1, 'Categoria inválida'),
})
