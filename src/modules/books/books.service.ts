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

export const getBookById = async (
  bookId: string,
  repository: BookRepository = bookData,
) => {
  const book = await repository.findBookById(bookId)
  return domain.assertBookExists(book)
}

export const countAvailableCopies = async (
  bookId: string,
  repository: BookRepository = bookData,
) => {
  return repository.getTotalAvailableCopies(bookId)
}

export const decreaseAvailableCopy = async (
  bookId: string,
  repository: BookRepository = bookData,
) => {
  return await repository.decreaseAvailableCopy(bookId)
}

export const increaseAvailableCopy = async (
  bookId: string,
  repository: BookRepository = bookData,
) => {
  return await repository.increaseAvailableCopy(bookId)
}
