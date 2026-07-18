import { Book, CreateBookInput } from '@/modules/books/domain/books.type.js'

type CreateBookInputArgs = CreateBookInput & { availableCopies: number }

export type BookRepository = {
  titleExists: (title: string) => Promise<boolean>
  createBook: (createBookInput: CreateBookInputArgs) => Promise<Book>
}
