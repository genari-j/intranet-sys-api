import 'module-alias/register'

import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import fastify from 'fastify'

import { Server as SocketIOServer } from 'socket.io'
import { makeAppRoutes } from '~/routes/index'

import { NewsService, SocketService } from '~/services/usecases/index'

import { databaseHealth, defineStaticFolders } from '~/helpers/index'
import { env } from '~/validators/index'

export const app = fastify()

app.register(multipart)
app.register(cors, {
	origin: '*',
	methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
})

const socketServer = new SocketIOServer(app.server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
	},
})

socketServer.on('connection', (socket) => {
	console.log('New user connected - Socket 💬')
	socket.on('message', (data) => console.log('Mensagem recebida:', data))
})

const socketService = new SocketService(socketServer)
new NewsService(socketService)

for (const route of makeAppRoutes(socketServer)) app.register(route)

app.register(defineStaticFolders('news'))
app.register(defineStaticFolders('incidents'))

app.listen({ port: Number(env.APP_PORT) }).then(async () => {
	await databaseHealth()
	console.log(`Application is running on port: ${env.APP_PORT} 💬`)
})
