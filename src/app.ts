import { bookRoutes } from '@/modules/books/http/books.routes.js'
import { errorHandler } from '@/shared/errors/error-handler.middleware.js'
import express from 'express'

export const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/v1/books/', bookRoutes)
app.use((req, res) => {
  res.status(404).json({
    error: `Cannot ${req.method} to ${req.originalUrl} - route not found`,
  })
})
app.use(errorHandler)
