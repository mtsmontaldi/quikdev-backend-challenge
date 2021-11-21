import { Router } from 'express'
import { makeUserCreateController } from '../factories/user-create'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUserListController } from '../factories/user-list'
import { makeUserFindController } from '../factories/user-find'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeUserCreateController()))
  router.get('/user', adaptRoute(makeUserListController()))
  router.get('/user/:id', adaptRoute(makeUserFindController()))
}
