import { existsSync } from 'node:fs'
import path from 'node:path'

import prismaClient from '~/config/prisma-client'

import type { CreateIncidentsBody, CreateIncidentsParams } from '~/@types/index'
import { cleanString, incidentsPath, saveFile, genUniqueCode } from '~/helpers/index'

export class IncidentsService {
	async createIncidents({
		title,
		description,
		department_name,
		category_name,
		user_id,
		avatars,
	}: CreateIncidentsParams) {
		const avatarFileNames: string[] = []

		if (avatars && avatars.length > 0) {
			for (const avatar of avatars) {
				const finalFileName = `${Date.now()}-${cleanString(avatar.originalname)}`
				avatarFileNames.push(finalFileName)

				if (existsSync(path.join(incidentsPath, finalFileName))) {
					throw new Error(`O arquivo ${finalFileName} já existe.`)
				}
			}
		}

		const createdIncident = await prismaClient.$transaction(async (tx) => {
			const department = await tx.department.findFirst({
				where: { name: department_name },
			})
			if (!department) throw new Error('O Departamento informado não existe.')

			const priority = await tx.incidentPriority.findFirst({
				where: { name: 'Normal' },
			})
			if (!priority) throw new Error('A Prioridade informada não existe.')

			const status = await tx.incidentStatus.findFirst({
				where: { name: 'Aberto' },
			})
			if (!status) throw new Error('O Status informado não existe.')

			const category = await tx.incidentCategory.findFirst({
				where: { name: category_name },
			})
			if (!category) throw new Error('A Categoria informada não existe.')

			let code: string
			let exists = true

			do {
				code = genUniqueCode('T')
				const incident = await tx.incident.findFirst({
					where: { code },
					select: { id: true },
				})
				exists = incident !== null
			} while (exists)

			const incidentPayload: CreateIncidentsBody = {
				code: code,
				title: title,
				description: description,
				register_by: user_id,
				department_id: department.id,
				priority_id: priority.id,
				status_id: status.id,
				category_id: category.id,
			}
			const createdIncident = await tx.incident.create({ data: incidentPayload })

			const avatarsPayload = avatars.map((_avatar, index) => ({
				incident_id: createdIncident.id,
				avatar: avatarFileNames[index],
			}))
			const createdIncidentAvatars = await tx.incidentAvatar.createMany({
				data: avatarsPayload,
			})

			return { createdIncident, createdIncidentAvatars }
		})

		for (const [index, avatar] of avatars.entries())
			await saveFile(avatar.path, path.join(incidentsPath, avatarFileNames[index]))

		return createdIncident
	}
}
