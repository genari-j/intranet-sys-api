import { z } from 'zod'

export const createIncidentsBodySchema = z.object({
	title: z.string().min(1, 'Título inválido'),
	description: z.string().min(1, 'Descrição inválida'),
	department_name: z.string().min(1, 'Departamento atendente inválido'),
	category_name: z.string().min(1, 'Categoria inválida'),
})
