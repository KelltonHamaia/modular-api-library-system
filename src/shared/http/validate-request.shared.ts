import { ZodType } from 'zod/v4'
import { Request } from 'express'

export const validateRequest = <T>(schema: ZodType<T>, req: Request) => {
  return schema.parse(req.body)
}
