import {
  BusinessRuleError,
  NotFoundError,
} from '@/shared/errors/error.shared.js'
import { Loan } from '@/modules/loans/domain/loans.type.js'

const LOANS_PER_MEMBER = 3

const calculateDueDate = () => {
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 14)
  return dueDate
}

export const assertBookHasAvailableCopy = (availableCopies: number) => {
  if (availableCopies <= 0) {
    throw new BusinessRuleError('No copies left to loan')
  }
}

export const assertMemberIsWithinLoanLimit = (loansByMember: number) => {
  if (loansByMember >= LOANS_PER_MEMBER) {
    throw new BusinessRuleError(
      `Member reached maximum loan limit (${LOANS_PER_MEMBER})`,
    )
  }
}
export const assertLoanExists = (loan: Loan | null) => {
  if (!loan) throw new NotFoundError('Loan not found')
  return loan
}

export const ensureLoanNotExists = (loan: Loan | null) => {
  if (loan && !loan.returnDate)
    throw new BusinessRuleError('Only one loan per book is allowed.')
}

export const buildNewLoan = (
  memberId: string,
  bookId: string,
): Omit<Loan, 'id'> => {
  return {
    bookId: bookId,
    memberId: memberId,
    dueDate: calculateDueDate(),
    loanDate: new Date(),
    returnDate: null,
    overdue: false,
  }
}

export const buildReturnedLoan = (loan: Loan): Loan => {
  return {
    ...loan,
    returnDate: new Date(),
    overdue: loan.dueDate < new Date(),
  }
}
