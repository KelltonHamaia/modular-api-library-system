import z from 'zod/v4'

export const createMemberSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
})

export const memberIdParamsSchema = z.object({
  id: z.uuid(),
})

export const updateMemberStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'SUSPENDED']),
})
