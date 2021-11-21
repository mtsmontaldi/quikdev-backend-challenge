import { UserUpdateController } from '../../presentation/controllers/user/user-update'
import { DbUpdateUser } from '../../data/usecases/db-update-user'
import { UpdateUserMongoRepository } from '../../infra/db/mongodb/user-repository/user-update'

export const makeUserUpdateController = (): UserUpdateController => {
  const updateUserMongoRepository = new UpdateUserMongoRepository()
  const dbUpdateUser = new DbUpdateUser(updateUserMongoRepository)

  return new UserUpdateController(dbUpdateUser)
}
