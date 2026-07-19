import { bookData } from '@/modules/books/data/books.data.js'
import * as domain from '@/modules/books/domain/books.domain.js'
import { BookRepository } from '@/modules/books/domain/books.repository.js'
import { CreateBookInput } from '@/modules/books/domain/books.type.js'

export const createBook = async (
  createBookInput: CreateBookInput,
  repository: BookRepository = bookData,
) => {
  const exists = await repository.titleExists(createBookInput.title)
  domain.assertBookDoesNotExist(exists, createBookInput.title)

  const newBook = await repository.createBook({
    ...createBookInput,
    availableCopies: domain.calculateInitialAvailableCopies(
      createBookInput.totalCopies,
    ),
  })

  return newBook
}

export const listBooks = async (repository: BookRepository = bookData) => {
  return await repository.listBooks()
}
