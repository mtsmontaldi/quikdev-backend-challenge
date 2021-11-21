import { UserModel } from '../../domain/models/user'

export interface FindUserRepository {
  find (userId: string): Promise<UserModel>
}
