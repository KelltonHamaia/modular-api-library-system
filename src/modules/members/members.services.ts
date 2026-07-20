import { MemberRepository } from '@/modules/members/data/members.repository.js'
import { memberData } from '@/modules/members/data/members.data.js'
import { CreateMemberInput } from '@/modules/members/domain/members.type.js'
import * as domain from '@/modules/members/domain/members.domain.js'

export const createMember = async (
  createMemberInput: CreateMemberInput,
  repository: MemberRepository = memberData,
) => {
  const exists = await repository.emailExists(createMemberInput.email)
  domain.assertEmailNotExists(exists)

  const memberToCreate = domain.buildNewMember(createMemberInput)
  const newMember = await repository.createMember(memberToCreate)

  return newMember
}
