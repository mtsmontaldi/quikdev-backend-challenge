import { UserDeleteController } from '../../presentation/controllers/user/user-delete'
import { DbDeleteUser } from '../../data/usecases/db-delete-user'
import { UserDeleteMongoRepository } from '../../infra/db/mongodb/user-repository/user-delete'

export const makeUserDeleteController = (): UserDeleteController => {
  const userDeleteMongoRepository = new UserDeleteMongoRepository()
  const dbDeleteUser = new DbDeleteUser(userDeleteMongoRepository)

  return new UserDeleteController(dbDeleteUser)
}
