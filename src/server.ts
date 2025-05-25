import fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'

if (process.env.npm_lifecycle_event === 'start') require('module-alias/register')

import { Server as SocketIOServer } from 'socket.io'
import { makeAppRoutes } from '~/routes/index'

import { SocketService, NewsService } from '~/services/usecases/index'

import { databaseHealth, staticNews, staticIncidents } from '~/helpers/index'
import { env } from '~/validators/index'

const app = fastify()
const server = app.server

app.register(multipart)
app.register(cors, {
	origin: '*',
	methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
})

const io = new SocketIOServer(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
	},
})

io.on('connection', (socket) => {
	console.log('Usuário conectado - Socket 💬')
	socket.on('message', (data) => console.log('Mensagem recebida:', data))
})

const socketService = new SocketService(io)
new NewsService(socketService)

for (const route of makeAppRoutes(io)) app.register(route)

app.register(staticNews)
app.register(staticIncidents)

app.listen({ port: Number(env.APP_PORT) }).then(async () => {
	await databaseHealth()
	console.log(`Application is running on port: ${env.APP_PORT} 💬`)
})
