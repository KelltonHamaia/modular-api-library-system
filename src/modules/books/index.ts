export {
  getBookById,
  countAvailableCopies,
  decreaseAvailableCopy,
  increaseAvailableCopy,
} from '@/modules/books/books.service.js'

export {
  assertAvailableCopiesDecreased,
  assertAvailableCopiesIncreased,
} from '@/modules/books/domain/books.domain.js'
