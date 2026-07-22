import { Loan } from '@/modules/loans/domain/loans.type.js'
type CreateLoan = Omit<Loan, 'id'>
type FindLoans = {
  memberId: string
  title: string
  returnDate: Date | null
  dueDate: Date
  overdue: boolean
}

export type LoansRepository = {
  countActiveLoansByMember: (memberId: string) => Promise<number>
  createLoan: (input: CreateLoan) => Promise<Loan>
  findLoanByMemberIdAndBookId: (
    memberId: string,
    bookId: string,
  ) => Promise<Loan | null>
  getLoanById: (loanId: string) => Promise<Loan>
  updateLoan: (loan: Loan) => Promise<Loan>
  findLoans: () => Promise<FindLoans[]>
  findLoansByMemberId: (memberId: string) => Promise<FindLoans[]>
}
