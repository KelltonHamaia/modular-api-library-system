import { ConflictError } from '@/shared/errors/error.shared.js'

export const assertBookDoesNotExist = (
  exists: boolean,
  title: string,
): void => {
  if (exists) {
    throw new ConflictError(`Book "${title}" already exists`)
  }
}

export const calculateInitialAvailableCopies = (
  totalCopies: number,
): number => {
  return totalCopies
}
