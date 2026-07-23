import { db } from '@/db/client.js'
import { books } from '@/db/schema.js'
import { BookRepository } from '@/modules/books/domain/books.repository.js'
import { and, eq, gt, lt, sql } from 'drizzle-orm'

export const bookData: BookRepository = {
  async titleExists(title) {
    const exists = await db
      .select({ id: books.id })
      .from(books)
      .where(eq(books.title, title))
    return exists.length > 0 ? true : false
  },

  async createBook(createBookInput) {
    const [newBook] = await db.insert(books).values(createBookInput).returning()
    return newBook
  },

  async listBooks() {
    return await db.select().from(books)
  },

  async findBookById(bookId) {
    const [book] = await db.select().from(books).where(eq(books.id, bookId))
    return book ?? null
  },

  async getTotalAvailableCopies(bookId) {
    const [book] = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
    return book.availableCopies
  },

  async decreaseAvailableCopy(bookId) {
    const [book] = await db
      .update(books)
      .set({ availableCopies: sql`${books.availableCopies} - 1` })
      .where(and(eq(books.id, bookId), gt(books.availableCopies, 0)))
      .returning()
    return book
  },

  async increaseAvailableCopy(bookId) {
    const [book] = await db
      .update(books)
      .set({
        availableCopies: sql`${books.availableCopies} + 1`,
      })
      .where(
        and(eq(books.id, bookId), lt(books.availableCopies, books.totalCopies)),
      )
      .returning()
    return book ?? null
  },
}
