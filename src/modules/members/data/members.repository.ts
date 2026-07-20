import {
  CreateMemberInput,
  Member,
  MEMBER_STATUS,
} from '@/modules/members/domain/members.type.js'

type CreateMemberRepositoryInput = CreateMemberInput & { status: MEMBER_STATUS }

export type MemberRepository = {
  emailExists: (email: string) => Promise<boolean>
  createMember: (input: CreateMemberRepositoryInput) => Promise<Member>
  getMemberById: (id: string) => Promise<Member | null>
}
