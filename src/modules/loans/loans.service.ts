import {
  countAvailableCopies,
  decreaseAvailableCopy,
  increaseAvailableCopy,
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
  await getActiveMemberById(memberId)
  const loanExists = await repository.findLoanByMemberIdAndBookId(
    memberId,
    bookId,
  )
  domain.ensureLoanNotExists(loanExists)
  const [loansByMember, availableCopies] = await Promise.all([
    repository.countActiveLoansByMember(memberId),
    countAvailableCopies(bookId),
  ])

  domain.assertBookHasAvailableCopy(availableCopies)
  domain.assertMemberIsWithinLoanLimit(loansByMember)

  const buildLoan = domain.buildNewLoan(memberId, bookId)
  const newLoan = await repository.createLoan(buildLoan)
  await decreaseAvailableCopy(bookId)
  return { newLoan }
}

export const returnLoan = async (
  loanId: string,
  repository: LoansRepository = loansData,
) => {
  const loan = await repository.getLoanById(loanId)
  const builtReturnedLoan = domain.buildReturnedLoan(loan)
  const updated = await repository.updateLoan(builtReturnedLoan)
  await increaseAvailableCopy(updated.bookId)
  return updated
}
