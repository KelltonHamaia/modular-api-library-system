import * as controller from '@/modules/members/http/members.controller.js'
import { Router } from 'express'

export const memberRoutes = Router()

memberRoutes.post('/', controller.postCreateMember)
memberRoutes.get('/:id', controller.getMemberById)
memberRoutes.patch('/:id', controller.patchMemberStatusById)
