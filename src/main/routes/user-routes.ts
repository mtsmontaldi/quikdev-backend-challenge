import { Router } from 'express'
import { makeUserCreateController, makeUserListController, makeUserFindController, makeUserDeleteController, makeUserUpdateController } from '../factories/'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeUserCreateController()))
  router.get('/user', adaptRoute(makeUserListController()))
  router.get('/user/:id', adaptRoute(makeUserFindController()))
  router.delete('/user/:id', adaptRoute(makeUserDeleteController()))
  router.put('/user', adaptRoute(makeUserUpdateController()))
}
