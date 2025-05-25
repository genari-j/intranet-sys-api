import prismaClient from '~/config/prisma-client'

type NotificationParams = {
	userId: string
	notificationsIDs: string[]
}

export class NotificationService {
	async markAsReadByIDs({ userId, notificationsIDs }: NotificationParams) {
		if (!Array.isArray(notificationsIDs) || notificationsIDs.length === 0)
			throw new Error('Nenhum ID foi especificado.')

		const updatedNotifications = await prismaClient.$transaction(async (tx) => {
			const foundNotifications = await tx.notification.findMany({
				where: {
					id: { in: notificationsIDs },
					user_id: userId,
				},
				select: { id: true },
			})

			if (foundNotifications.length !== notificationsIDs.length)
				throw new Error('Alguma das notificações especificadas pode não existir ou não pertence ao usuário.')

			const updated = await tx.notification.updateMany({
				where: {
					id: { in: notificationsIDs },
					user_id: userId,
					read: false,
				},
				data: {
					read: true,
				},
			})

			return updated
		})

		return updatedNotifications
	}
}
