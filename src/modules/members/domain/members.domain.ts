import { ConflictError } from '@/shared/errors/error.shared.js'
import {
  CreateMemberInput,
  MEMBER_STATUS,
} from '@/modules/members/domain/members.type.js'

const INITIAL_MEMBER_STATUS = 'ACTIVE'

export const assertEmailNotExists = (exists: boolean) => {
  if (exists) {
    throw new ConflictError('E-mail already used.')
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
