import {
  validateRequestBody,
  validateRequestParams,
} from '@/shared/http/validate-request.shared.js'
import { RequestHandler } from 'express'
import {
  createBookSchema,
  getBookByIdSchema,
} from '@/modules/books/http/books.schemas.js'
import * as service from '@/modules/books/books.service.js'

export const postCreateBook: RequestHandler = async (req, res) => {
  const payload = validateRequestBody(createBookSchema, req)
  const result = await service.createBook(payload)
  return res.status(200).json({ result })
}

export const getBooks: RequestHandler = async (req, res) => {
  const result = await service.listBooks()
  return res.status(200).json({ result })
}

export const getBookById: RequestHandler = async (req, res) => {
  const { id } = validateRequestParams(getBookByIdSchema, req)
  const result = await service.getBookById(id)
  return res.status(200).json({ result })
}
