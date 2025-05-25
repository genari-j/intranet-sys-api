import prismaClient from '~/config/prisma-client'

import type { Server } from 'socket.io'

type NotificationParams = {
	title: string
	description: string
	userId: string
}

export class SocketService {
	private io: Server

	constructor(io: Server) {
		this.io = io
	}

	private async saveNotification({ title, description, userId }: NotificationParams) {
		return await prismaClient.notification.create({
			data: {
				title,
				description,
				user_id: userId,
			},
		})
	}

	private sendNotificationToSocket({ title, description, userId }: NotificationParams) {
		this.io.emit('notification', {
			userId,
			title,
			description,
		})
	}

	async createNotification({ title, description, userId }: NotificationParams) {
		const notification = await this.saveNotification({ title, description, userId })

		this.sendNotificationToSocket({
			title,
			description,
			userId,
		})

		return notification
	}

	async createNotificationForOneUser({ title, description, userId }: NotificationParams) {
		const notification = await this.createNotification({
			title,
			description,
			userId,
		})

		return notification
	}

	async createNotificationForAllUsers({ title, description }: Omit<NotificationParams, 'userId'>) {
		const users = await prismaClient.user.findMany()

		const notifications = await Promise.all(
			users.map(async (user) => {
				return this.createNotification({
					title,
					description,
					userId: user.id,
				})
			}),
		)

		return notifications
	}

	async createNotificationForDepartments({
		title,
		description,
		departmentIds,
	}: {
		title: string
		description: string
		departmentIds: string[]
	}) {
		const users = await prismaClient.user.findMany({
			where: {
				department_id: {
					in: departmentIds,
				},
			},
		})

		const notifications = await Promise.all(
			users.map(async (user) => {
				return this.createNotification({
					title,
					description,
					userId: user.id,
				})
			}),
		)

		return notifications
	}
}
