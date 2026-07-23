import { ErrorRequestHandler } from 'express'
import { AppError } from '@/shared/errors/error.shared.js'
import { ZodError, flattenError } from 'zod'

export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      error: flattenError(error),
    })
  }
  if (error instanceof AppError) {
    return res.status(error.code).json({
      error: error.message,
    })
  }
  console.log(error)
  return res.status(500).json({ error: 'Internal server error' })
}
