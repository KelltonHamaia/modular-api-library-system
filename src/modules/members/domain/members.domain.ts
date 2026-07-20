import { ConflictError, NotFoundError } from '@/shared/errors/error.shared.js'
import {
  CreateMemberInput,
  Member,
  MEMBER_STATUS,
} from '@/modules/members/domain/members.type.js'

const INITIAL_MEMBER_STATUS = 'ACTIVE'

export const assertEmailNotExists = (exists: boolean) => {
  if (exists) {
    throw new ConflictError('E-mail already used.')
  }
}

export const assertMemberExists = (member: Member | null) => {
  if (!member) {
    throw new NotFoundError()
  }
}

export const buildNewMember = (
  input: CreateMemberInput,
): CreateMemberInput & { status: MEMBER_STATUS } => {
  return {
    ...input,
    status: INITIAL_MEMBER_STATUS,
  }
}
