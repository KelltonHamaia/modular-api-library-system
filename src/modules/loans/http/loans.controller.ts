import {
  createLoanSchema,
  getLoanByIdSchema,
  getLoansFromMemberId,
  patchReturnLoanSchema,
} from '@/modules/loans/http/loans.schema.js'
import {
  validateRequestBody,
  validateRequestParams,
  validateRequestQuery,
} from '@/shared/http/validate-request.shared.js'
import { RequestHandler } from 'express'

import * as service from '@/modules/loans/loans.service.js'

export const postCreateLoan: RequestHandler = async (req, res) => {
  const { bookId, memberId } = validateRequestBody(createLoanSchema, req)
  const result = await service.createLoan(bookId, memberId)
  return res.status(201).json({ result })
}

export const patchReturnLoan: RequestHandler = async (req, res) => {
  const { id } = validateRequestParams(getLoanByIdSchema, req)
  const result = await service.returnLoan(id)
  return res.status(200).json({ result })
}

export const getLoans: RequestHandler = async (req, res) => {
  const { memberId } = validateRequestQuery(getLoansFromMemberId, req)
  const result = memberId
    ? await service.getLoansFromMember(memberId)
    : await service.getLoans()
  return res.status(200).json({ result })
}
