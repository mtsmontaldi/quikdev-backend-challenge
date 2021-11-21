import { UserModel } from '../models/user'

export interface ListUser {
  list(): Promise<UserModel[]>
}
