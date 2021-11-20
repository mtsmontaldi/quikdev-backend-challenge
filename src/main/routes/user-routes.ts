import { Router } from 'express'
import { makeUserCreateController } from '../factories/user-create'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/user', adaptRoute(makeUserCreateController()))
}
