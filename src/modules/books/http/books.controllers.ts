import { validateRequest } from '@/shared/http/validate-request.shared.js'
import { RequestHandler } from 'express'
import { createBookSchema } from '@/modules/books/http/books.schemas.js'
import * as service from '@/modules/books/books.services.js'

export const postCreateBook: RequestHandler = async (req, res) => {
  const payload = validateRequest(createBookSchema, req)
  const result = await service.createBook(payload)
  return res.status(200).json({ result })
}
