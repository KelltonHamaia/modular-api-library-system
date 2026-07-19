import { db } from '@/db/client.js'
import { books } from '@/db/schema.js'
import { BookRepository } from '@/modules/books/domain/books.repository.js'
import { eq } from 'drizzle-orm'

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

  async getBookById(id) {
    const [book] = await db.select().from(books).where(eq(books.id, id))
    return book ?? null
  },
}
