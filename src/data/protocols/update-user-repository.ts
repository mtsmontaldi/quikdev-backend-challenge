import { UserModel } from '../../domain/models/user'

export interface UpdateUserRepository {
  update (user: UserModel): Promise<UserModel>
}
