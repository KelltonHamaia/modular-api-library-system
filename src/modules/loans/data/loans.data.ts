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
}
