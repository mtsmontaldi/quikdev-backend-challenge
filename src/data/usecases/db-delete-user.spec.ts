import { DbDeleteUser } from './db-delete-user'
import { DeleteUserRepository } from '../protocols/delete-user-repository'

const makeDeleteUserRepository = (): DeleteUserRepository => {
  class DeleteUserRepositoryStub implements DeleteUserRepository {
    async delete (userId: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new DeleteUserRepositoryStub()
}

interface SutTypes {
  sut: DbDeleteUser
  deleteUserRepositoryStub: DeleteUserRepository
}

const makeSut = (): SutTypes => {
  const deleteUserRepositoryStub = makeDeleteUserRepository()
  const sut = new DbDeleteUser(deleteUserRepositoryStub)

  return {
    sut,
    deleteUserRepositoryStub
  }
}

describe('DbDeleteUser Usecase', () => {
  test('Should call deleteUserRepository with correct userId', async () => {
    const { sut, deleteUserRepositoryStub } = makeSut()
    const deleteUserRepositoryStubSpy = jest.spyOn(deleteUserRepositoryStub, 'delete')

    await sut.delete('valid_userId')

    expect(deleteUserRepositoryStubSpy).toHaveBeenCalledWith('valid_userId')
  })
})
