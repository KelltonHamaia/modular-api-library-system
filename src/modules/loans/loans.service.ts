import {
  decreaseAvailableCopy,
  increaseAvailableCopy,
  getBookById,
  assertAvailableCopiesDecreased,
  assertAvailableCopiesIncreased,
} from '@/modules/books/index.js'
import { loansData } from '@/modules/loans/data/loans.data.js'
import * as domain from '@/modules/loans/domain/loans.domain.js'
import { LoansRepository } from '@/modules/loans/domain/loans.repository.js'
import { getActiveMemberById } from '@/modules/members/index.js'

export const createLoan = async (
  bookId: string,
  memberId: string,
  repository: LoansRepository = loansData,
) => {
  const [book] = await Promise.all([
    getBookById(bookId),
    getActiveMemberById(memberId),
  ])

  const loanExists = await repository.findLoanByMemberIdAndBookId(
    memberId,
    bookId,
  )

  domain.ensureLoanNotExists(loanExists)

  const loansByMember = await repository.countActiveLoansByMember(memberId)
  domain.assertMemberIsWithinLoanLimit(loansByMember)
  domain.assertBookHasAvailableCopy(book.availableCopies)

  const buildLoan = domain.buildNewLoan(memberId, bookId)
  const newLoan = await repository.createLoan(buildLoan)
  const decreasedBook = await decreaseAvailableCopy(bookId)
  assertAvailableCopiesIncreased(decreasedBook)

  return { newLoan }
}

export const returnLoan = async (
  loanId: string,
  repository: LoansRepository = loansData,
) => {
  const loan = await repository.getLoanById(loanId)
  const builtReturnedLoan = domain.buildReturnedLoan(loan)
  const updated = await repository.updateLoan(builtReturnedLoan)
  const increased = await increaseAvailableCopy(updated.bookId)
  assertAvailableCopiesDecreased(increased)

  return updated
}

export const getLoans = async (repository: LoansRepository = loansData) => {
  const loans = repository.findLoans()
  return loans
}

export const getLoansFromMember = async (
  memberId: string,
  repository: LoansRepository = loansData,
) => {
  const loans = await repository.findLoansByMemberId(memberId)
  return loans
}
