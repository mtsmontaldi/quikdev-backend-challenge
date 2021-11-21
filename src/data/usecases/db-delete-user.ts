import { DeleteUser } from '../../domain/usecases/delete-user'
import { DeleteUserRepository } from '../protocols/delete-user-repository'

export class DbDeleteUser implements DeleteUser {
  private readonly deleteUserRepository: DeleteUserRepository

  constructor (deleteUserRepository: DeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository
  }

  async delete (userId: string): Promise<boolean> {
    return await this.deleteUserRepository.delete(userId)
  }
}
