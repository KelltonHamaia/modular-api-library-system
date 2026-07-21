import { Loan } from '@/modules/loans/domain/loans.type.js'
type CreateLoan = Omit<Loan, 'id'>

export type LoansRepository = {
  countActiveLoansByMember: (memberId: string) => Promise<number>
  createLoan: (input: CreateLoan) => Promise<Loan>
  findLoanByMemberIdAndBookId: (
    memberId: string,
    bookId: string,
  ) => Promise<Loan | null>
}
