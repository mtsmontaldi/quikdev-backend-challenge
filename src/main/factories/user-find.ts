import { UserFindController } from '../../presentation/controllers/user/user-find'
import { UserFindMongoRepository } from '../../infra/db/mongodb/user-repository/user-find'
import { DbFindUser } from '../../data/usecases/db-find-user'

export const makeUserFindController = (): UserFindController => {
  const userFindMongoRepository = new UserFindMongoRepository()
  const dbFindUser = new DbFindUser(userFindMongoRepository)
  return new UserFindController(dbFindUser)
}
