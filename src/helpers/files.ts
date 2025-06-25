import fastifyStatic from '@fastify/static'
import type { FastifyPluginAsync } from 'fastify'
import multer from 'fastify-multer'

import fs from 'node:fs'
import path from 'node:path'

export const createStorage = (destinationPath: string) => {
	const storage = multer.diskStorage({
		destination: (_req, _file, cb) => {
			cb(null, `${destinationPath}/tmp`)
		},
	})

	const upload = multer({
		dest: `${destinationPath}/tmp`,
		storage: storage,
	})

	return upload
}

export const saveFile = async (oldPath: string, newPath: string) => {
	await fs.rename(oldPath, newPath, (err) => {
		if (err) console.log(err)
	})
}

export const defineStaticFolders = (folderName: string): FastifyPluginAsync => {
	return async (fastify) => {
		fastify.register(fastifyStatic, {
			root: path.join(__dirname, '..', 'uploads', folderName),
			prefix: `/uploads/${folderName}`,
			decorateReply: false,
		})
	}
}

export const newsPath = './src/uploads/news'
export const incidentsPath = './src/uploads/incidents'
