import {
  CreateMemberInput,
  Member,
  MEMBER_STATUS,
} from '@/modules/members/domain/members.type.js'

type CreateMemberRepositoryInput = CreateMemberInput & { status: MEMBER_STATUS }

export type MemberRepository = {
  emailExists: (email: string) => Promise<boolean>
  createMember: (input: CreateMemberRepositoryInput) => Promise<Member>
  findMemberById: (id: string) => Promise<Member | null>
  updateMemberStatusById: (id: string, status: MEMBER_STATUS) => Promise<Member>
}
