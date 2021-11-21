import { ListUserRepository } from '../protocols/list-user-repository'
import { ListUser } from '../../domain/usecases/list-user'
import { UserModel } from '../../domain/models/user'

export class DbListUser implements ListUser {
  private readonly listUserRepository: ListUserRepository

  constructor (listUserRepository: ListUserRepository) {
    this.listUserRepository = listUserRepository
  }

  async list (): Promise<UserModel[]> {
    const result = await this.listUserRepository.list()

    return result
  }
}
