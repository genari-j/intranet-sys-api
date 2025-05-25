import { existsSync } from 'node:fs'
import path from 'node:path'
import { unlink } from 'node:fs/promises'

import prismaClient from '~/config/prisma-client'

import type { SocketService } from '~/services/usecases/index'

import { cleanString, newsPath, saveFile } from '~/helpers/index'
import type { CreateNewsBody, UpdateNewsBody } from '~/@types/index'

type CreateNewsParams = {
	title: string
	description: string
	flag_name: string
	avatar: {
		originalname: string
		filename: string
		fieldname: string
		destination: string
		path: string
		encoding: string
		mimetype: string
		size: number
	}
}

type UpdateNewsParams = {
	id: string
	title?: string | undefined
	description?: string | undefined
	flag_name?: string | undefined
	avatar?:
		| {
				originalname: string
				filename: string
				fieldname: string
				destination: string
				path: string
				encoding: string
				mimetype: string
				size: number
		  }
		| undefined
}

export class NewsService {
	private socketService: SocketService

	constructor(socketService: SocketService) {
		this.socketService = socketService
	}

	async createNews({ title, description, avatar, flag_name }: CreateNewsParams) {
		const finalFileName = `${Date.now()}-${cleanString(avatar.originalname)}`

		if (existsSync(`${newsPath}/${avatar?.filename}`)) throw new Error('Outro arquivo com esse nome já existe.')

		const createdNews = await prismaClient.$transaction(async (tx) => {
			const flag = await tx.newsFlag.findFirst({
				where: { name: flag_name },
			})
			if (!flag) throw new Error('A Sessão informada não existe.')

			const existing = await tx.news.findFirst({
				where: { title: title },
			})
			if (existing) throw new Error('A Notícia informada já existe.')

			const payload: CreateNewsBody = {
				title,
				description,
				flag_id: flag.id,
				avatar: finalFileName,
			}

			const created = await tx.news.create({ data: payload })
			return created
		})

		await saveFile(avatar.path, `${newsPath}/${finalFileName}`)

		await this.socketService.createNotificationForAllUsers({
			title: 'Nova notícia',
			description: `Uma nova notícia foi publicada: ${title}`,
		})

		return createdNews
	}

	async updateNews({ id, title, description, flag_name, avatar }: UpdateNewsParams) {
		const finalFileName = avatar && avatar.size > 0 ? `${Date.now()}-${cleanString(avatar.originalname)}` : null

		if (avatar && existsSync(`${newsPath}/${avatar?.filename}`))
			throw new Error('Outro arquivo com esse nome já existe.')

		const updatedNews = await prismaClient.$transaction(async (tx) => {
			const existing = await tx.news.findFirst({ where: { id } })
			if (!existing) throw new Error('A Notícia informada não existe.')

			const updateData: UpdateNewsBody = {}

			if (title) {
				const sameTitle = await tx.news.findFirst({
					where: {
						title: title,
						id: { not: id },
					},
				})
				if (sameTitle) throw new Error('A Notícia informada já existe.')
				updateData.title = title
			}

			if (description) updateData.description = description

			if (flag_name) {
				const flag = await tx.newsFlag.findFirst({ where: { name: flag_name } })
				if (!flag) throw new Error('A Sessão informada não existe.')
				updateData.flag_id = flag.id
			}

			if (avatar && avatar.size > 0 && finalFileName) {
				const oldAvatar = String(existing.avatar).split('/').pop()
				const oldPath = path.resolve(`${newsPath}`, oldAvatar as string)

				updateData.avatar = finalFileName

				await unlink(oldPath)
			}

			if (Object.keys(updateData).length > 0) {
				const updatedNews = await tx.news.update({
					where: { id },
					data: updateData,
				})
				return updatedNews
			}
		})

		if (avatar && finalFileName) await saveFile(avatar.path, `${newsPath}/${finalFileName}`)

		return updatedNews
	}
}
