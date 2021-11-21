import { FindUser } from '../../domain/usecases/find-user'
import { FindUserRepository } from '../protocols/find-user-repository'
import { UserModel } from '../../domain/models/user'

export class DbFindUser implements FindUser {
  private readonly findUserRepository: FindUserRepository

  constructor (findUserRepository: FindUserRepository) {
    this.findUserRepository = findUserRepository
  }

  async find (userId: string): Promise<UserModel> {
    return await this.findUserRepository.find(userId)
  }
}
