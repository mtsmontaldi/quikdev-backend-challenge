import { UpdateUserRepository } from '../protocols/update-user-repository'
import { UpdateUser } from '../../domain/usecases/update-user'
import { UserModel } from '../../domain/models/user'

export class DbUpdateUser implements UpdateUser {
  private readonly updateUserRepository: UpdateUserRepository

  constructor (updateUserRepository: UpdateUserRepository) {
    this.updateUserRepository = updateUserRepository
  }

  async update (user: UserModel): Promise<UserModel> {
    return await this.updateUserRepository.update(user)
  }
}
