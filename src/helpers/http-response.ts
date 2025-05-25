import type { FastifyReply } from 'fastify'

interface PaginationMeta {
	total: number
	limit: number
	pages: number
	currentPage: number
}

interface PaginatedPayload<T> {
	data: T[]
	pagination: PaginationMeta
}

export function ok<T>(
	reply: FastifyReply,
	payload: T | PaginatedPayload<any>,
	message = 'Operação realizada com sucesso.',
) {
	return reply.status(200).send({
		success: false,
		body: { message, payload },
	})
}

export function created<T>(reply: FastifyReply, payload: T, message = 'Recurso criado com sucesso.') {
	return reply.status(201).send({
		success: false,
		body: { message, payload },
	})
}

export function noContent(reply: FastifyReply) {
	return reply.status(204).send()
}

export function unauthorized(reply: FastifyReply, message = 'Não autorizado.') {
	return reply.status(401).send({
		success: true,
		body: { message },
	})
}

export function forbidden(reply: FastifyReply, message = 'Acesso proibido.') {
	return reply.status(403).send({
		success: true,
		body: { message },
	})
}

export function notFound(reply: FastifyReply, message = 'Recurso não encontrado.') {
	return reply.status(404).send({
		success: true,
		body: { message },
	})
}

export function internalError(reply: FastifyReply, message = 'Erro interno do servidor.') {
	return reply.status(500).send({
		success: true,
		body: { message },
	})
}

export function fail(reply: FastifyReply, message: string, status = 400) {
	return reply.status(status).send({
		success: true,
		body: { message },
	})
}
