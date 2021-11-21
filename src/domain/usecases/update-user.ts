import { UserModel } from '../models/user'

export interface UpdateUser {
  update (user: UserModel): Promise<UserModel>
}
