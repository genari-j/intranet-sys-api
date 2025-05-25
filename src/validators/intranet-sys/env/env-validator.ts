import { z } from 'zod'
import 'dotenv/config'

const errorMessage = 'Caracteres não informados 😕'

const envSchema = z.object({
	APP_PORT: z.coerce.number().min(1, errorMessage),
	APP_SECRET: z.string().min(1, errorMessage),
	BCRYPT_SALT_ROUNDS: z.coerce.number().min(1, errorMessage),
	INITIAL_DATA_OFFSET: z.coerce.number().min(1, errorMessage),
	LIST_PER_PAGE: z.coerce.number().min(1, errorMessage),
	DATABASE_URL: z.string().min(1, errorMessage),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('💬 Ops, ocorreu algum erro relacionado a variáveis de ambiente.', _env.error.format())
	throw new Error('💬 Variáveis de ambiente inválidas.')
}

export const env = _env.data
