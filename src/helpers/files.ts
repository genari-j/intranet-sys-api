import type { FastifyPluginAsync } from 'fastify'
import fastifyStatic from '@fastify/static'
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

export const staticNews: FastifyPluginAsync = async (fastify) => {
	fastify.register(fastifyStatic, {
		root: path.join(__dirname, '..', 'uploads', 'news'),
		prefix: '/uploads/news',
		decorateReply: false,
	})
}

export const staticIncidents: FastifyPluginAsync = async (fastify) => {
	fastify.register(fastifyStatic, {
		root: path.join(__dirname, '..', 'uploads', 'incidents'),
		prefix: '/uploads/incidents',
		decorateReply: false,
	})
}

export const newsPath = './src/uploads/news'
export const incidentsPath = './src/uploads/incidents'
