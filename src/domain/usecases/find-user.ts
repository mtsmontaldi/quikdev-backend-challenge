import { UserModel } from '../models/user'

export interface FindUser {
  find(userId: string): Promise<UserModel>
}
