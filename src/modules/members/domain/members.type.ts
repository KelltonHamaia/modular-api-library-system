export type MEMBER_STATUS = 'ACTIVE' | 'SUSPENDED'

export type Member = {
  id: string
  name: string
  email: string
  status: MEMBER_STATUS
}

export type CreateMemberInput = {
  name: string
  email: string
}
