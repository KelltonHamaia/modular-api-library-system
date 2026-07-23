import { ConflictError, NotFoundError } from '@/shared/errors/error.shared.js'
import { Book } from '@/modules/books/domain/books.type.js'

export const assertBookDoesNotExist = (
  exists: boolean,
  title: string,
): void => {
  if (exists) {
    throw new ConflictError(`Book "${title}" already exists`)
  }
}

export const calculateInitialAvailableCopies = (
  totalCopies: number,
): number => {
  return totalCopies
}

export const assertBookExists = (book: Book | null): Book => {
  if (!book) throw new NotFoundError('Book not found')
  return book
}
