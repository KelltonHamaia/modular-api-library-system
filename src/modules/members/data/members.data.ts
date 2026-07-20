import { db } from '@/db/client.js'
import { members } from '@/db/schema.js'
import { eq } from 'drizzle-orm'
import { MemberRepository } from '@/modules/members/data/members.repository.js'

export const memberData: MemberRepository = {
  async emailExists(email) {
    const [member] = await db
      .select()
      .from(members)
      .where(eq(members.email, email))
    return member !== undefined
  },

  async createMember(input) {
    const [newMember] = await db.insert(members).values(input).returning()
    return newMember
  },

  async findMemberById(id) {
    const [member] = await db.select().from(members).where(eq(members.id, id))
    return member ?? null
  },
}
