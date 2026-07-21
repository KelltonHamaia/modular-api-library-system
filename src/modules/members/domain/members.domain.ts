import {
  BusinessRuleError,
  ConflictError,
  NotFoundError,
} from '@/shared/errors/error.shared.js'
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

export const ensureMemberExists = (member: Member | null) => {
  if (!member) {
    throw new NotFoundError()
  }
  return member
}

export const assertMemberIsActive = (member: Member) => {
  if (member.status !== 'ACTIVE')
    throw new BusinessRuleError('Member is not active, unable to make a loan')
}

export const buildNewMember = (
  input: CreateMemberInput,
): CreateMemberInput & { status: MEMBER_STATUS } => {
  return {
    ...input,
    status: INITIAL_MEMBER_STATUS,
  }
}
