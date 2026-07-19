import z from 'zod/v4'

const createBookSchema = z.object({
  title: z.string().min(2),
  author: z.string().min(2),
  totalCopies: z.number().int().min(1),
})

const getBookByIdSchema = z.object({
  id: z.uuid(),
})

export { createBookSchema, getBookByIdSchema }
