import z from 'zod/v4'

export const createLoanSchema = z.object({
  bookId: z.uuid(),
  memberId: z.uuid(),
})
