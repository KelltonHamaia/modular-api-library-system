import { Router } from 'express'
import * as controller from '@/modules/books/http/books.controllers.js'

export const bookRoutes = Router()

bookRoutes.post('/', controller.postCreateBook)
bookRoutes.get('/', controller.getBooks)
