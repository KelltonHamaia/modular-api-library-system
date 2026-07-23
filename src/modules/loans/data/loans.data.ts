import { db } from '@/db/client.js'
import { books, loans, members } from '@/db/schema.js'
import { LoansRepository } from '@/modules/loans/domain/loans.repository.js'
import { eq, count, and, isNull } from 'drizzle-orm'

export const loansData: LoansRepository = {
  async countActiveLoansByMember(memberId) {
    const [result] = await db
      .select({
        total: count(),
      })
      .from(loans)
      .where(and(eq(loans.memberId, memberId), isNull(loans.returnDate)))
    return result.total
  },

  async createLoan(input) {
    const [newLoan] = await db.insert(loans).values(input).returning()
    return newLoan
  },

  async findLoanByMemberIdAndBookId(memberId: string, bookId: string) {
    const [loan] = await db
      .select()
      .from(loans)
      .where(
        and(
          eq(loans.memberId, memberId),
          eq(loans.bookId, bookId),
          isNull(loans.returnDate),
        ),
      )
    return loan ?? null
  },

  async getLoanById(loanId) {
    const [loan] = await db.select().from(loans).where(eq(loans.id, loanId))
    return loan ?? null
  },

  async updateLoan(loan) {
    const [updatedLoan] = await db
      .update(loans)
      .set(loan)
      .where(eq(loans.id, loan.id))
      .returning()
    return updatedLoan
  },

  async findLoansByMemberId(memberId) {
    return await db
      .select({
        id: loans.id,
        memberId: loans.memberId,
        title: books.title,
        returnDate: loans.returnDate,
        dueDate: loans.dueDate,
        overdue: loans.overdue,
      })
      .from(loans)
      .innerJoin(books, eq(loans.bookId, books.id))
      .where(eq(loans.memberId, memberId))
  },
  async findLoans() {
    return await db
      .select({
        id: loans.id,
        memberId: loans.memberId,
        title: books.title,
        returnDate: loans.returnDate,
        dueDate: loans.dueDate,
        overdue: loans.overdue,
      })
      .from(loans)
      .innerJoin(books, eq(loans.bookId, books.id))
      .groupBy(
        loans.id,
        loans.memberId,
        books.title,
        loans.returnDate,
        loans.dueDate,
        loans.overdue,
      )
  },
}
