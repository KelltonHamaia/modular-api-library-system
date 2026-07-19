import { ZodType } from 'zod/v4'
import { Request } from 'express'

export const validateRequestBody = <T>(schema: ZodType<T>, req: Request) => {
  return schema.parse(req.body)
}
