import {
  createMemberSchema,
  memberIdParamsSchema,
  updateMemberStatusSchema,
} from '@/modules/members/http/members.schema.js'
import * as service from '@/modules/members/members.services.js'
import {
  validateRequestBody,
  validateRequestParams,
} from '@/shared/http/validate-request.shared.js'
import { RequestHandler } from 'express'

export const postCreateMember: RequestHandler = async (req, res) => {
  const createMemberInput = validateRequestBody(createMemberSchema, req)
  const result = await service.createMember(createMemberInput)
  return res.status(201).json({ result })
}

export const getMemberById: RequestHandler = async (req, res) => {
  const { id } = validateRequestParams(memberIdParamsSchema, req)
  const result = await service.getMemberById(id)
  return res.status(200).json({ result })
}

export const patchMemberStatusById: RequestHandler = async (req, res) => {
  const { id } = validateRequestParams(memberIdParamsSchema, req)
  const { status } = validateRequestBody(updateMemberStatusSchema, req)
  const result = await service.updateMemberStatusById(id, status)
  return res.status(200).json({ result })
}
