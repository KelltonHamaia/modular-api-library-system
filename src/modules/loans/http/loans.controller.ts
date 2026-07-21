import { RequestHandler } from 'express'
import { createLoanSchema } from '@/modules/loans/http/loans.schema.js'
import { validateRequestBody } from '@/shared/http/validate-request.shared.js'

import * as service from '@/modules/loans/loans.service.js'

export const postCreateLoan: RequestHandler = async (req, res) => {
  const { bookId, memberId } = validateRequestBody(createLoanSchema, req)
  const result = await service.createLoan(bookId, memberId)
  return res.status(201).json({ result })
}
