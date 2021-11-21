import { UserModel } from '../../domain/models/user'

export interface ListUserRepository {
  list (): Promise<UserModel[]>
}
