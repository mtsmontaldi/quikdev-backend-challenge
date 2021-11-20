import { AddUser, AddUserModel, UserModel, AddUserRepository } from './db-add-user-protocols'

export class DbAddUser implements AddUser {
  private readonly addUserRepository: AddUserRepository

  constructor (addUserRepository: AddUserRepository) {
    this.addUserRepository = addUserRepository
  }

  async add (userData: AddUserModel): Promise<UserModel> {
    return await this.addUserRepository.add(userData)
  }
}
