export type Book = {
  id: string
  title: string
  author: string
  totalCopies: number
  availableCopies: number
}

export type CreateBookInput = {
  title: string
  author: string
  totalCopies: number
}
