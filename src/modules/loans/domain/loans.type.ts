export type Loan = {
  id: string
  loanDate: Date
  dueDate: Date
  returnDate: Date | null
  overdue: boolean
  bookId: string
  memberId: string
}

export type CreateLoan = {
  bookId: string
  memberId: string
}
