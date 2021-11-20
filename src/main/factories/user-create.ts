import { UserCreateController } from '../../presentation/controllers/user/user-create'
import { DbAddUser } from '../../data/usecases/db-add-user'
import { UserMongoRepository } from '../../infra/db/mongodb/user-repository/user'

export const makeUserCreateController = (): UserCreateController => {
  const userMongoRepository = new UserMongoRepository()
  const dbAddUser = new DbAddUser(userMongoRepository)

  return new UserCreateController(dbAddUser)
}
