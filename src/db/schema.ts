//livros, membros e emprestimos

import { sql } from 'drizzle-orm'
import {
  integer,
  pgEnum,
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core'

const idHelper = {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
}

export const books = pgTable('books', {
  ...idHelper,
  title: varchar({ length: 255 }).notNull(),
  author: varchar({ length: 255 }).notNull(),
  totalCopies: integer().notNull(),
  availableCopies: integer().notNull(),
})

export const STATUS = pgEnum('status', ['ACTIVE', 'SUSPENDED'])

export const members = pgTable('members', {
  ...idHelper,
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique('unique-email-string'),
  status: STATUS().notNull().default('ACTIVE'),
})

export const loans = pgTable('loans', {
  ...idHelper,
  loanDate: timestamp({ withTimezone: true }).notNull().defaultNow(),
  dueDate: timestamp({ withTimezone: true }).notNull(),
  returnDate: timestamp({ withTimezone: true }),
  overdue: boolean().notNull().default(false),

  bookId: uuid()
    .notNull()
    .references(() => books.id),
  memberId: uuid()
    .notNull()
    .references(() => members.id),
})
