import { Book, CreateBookInput } from '@/modules/books/domain/books.type.js'

type CreateBookInputArgs = CreateBookInput & { availableCopies: number }

export type BookRepository = {
  titleExists: (title: string) => Promise<boolean>
  createBook: (createBookInput: CreateBookInputArgs) => Promise<Book>
  listBooks: () => Promise<Book[]>
  findBookById: (bookId: string) => Promise<Book | null>
  getTotalAvailableCopies: (bookId: string) => Promise<number>
  decreaseAvailableCopy: (bookId: string) => Promise<Book>
}
