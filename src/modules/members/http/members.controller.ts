import { createMemberSchema } from '@/modules/members/http/members.schema.js'
import * as service from '@/modules/members/members.services.js'
import { validateRequestBody } from '@/shared/http/validate-request.shared.js'
import { RequestHandler } from 'express'

export const postCreateMember: RequestHandler = async (req, res) => {
  const createMemberInput = validateRequestBody(createMemberSchema, req)
  const result = await service.createMember(createMemberInput)
  return res.status(201).json({ result })
}
