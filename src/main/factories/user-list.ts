import { UserListController } from '../../presentation/controllers/user/user-list'
import { UserListMongoRepository } from '../../infra/db/mongodb/user-repository/user-list'
import { DbListUser } from '../../data/usecases/db-list-user'

export const makeUserListController = (): UserListController => {
  const userListMongoRepository = new UserListMongoRepository()
  const dbListUser = new DbListUser(userListMongoRepository)
  return new UserListController(dbListUser)
}
