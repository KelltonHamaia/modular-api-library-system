import z from 'zod/v4'

export const createLoanSchema = z.object({
  bookId: z.uuid(),
  memberId: z.uuid(),
})

export const getLoanByIdSchema = z.object({
  id: z.uuid(),
})

export const patchReturnLoanSchema = z.object({
  returnDate: z.date(),
})
