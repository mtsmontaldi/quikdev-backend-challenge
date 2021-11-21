import { UserDeleteController } from './user-delete'
import { DeleteUser } from '../../../domain/usecases/delete-user'

const makeDeleteUser = (): DeleteUser => {
  class DeleteUserStub implements DeleteUser {
    async delete (userId: string): Promise<boolean> {
      return await new Promise(resolve => resolve(true))
    }
  }

  return new DeleteUserStub()
}

interface SutTypes {
  sut: UserDeleteController
  deleteUserStub: DeleteUser
}

const makeSut = (): SutTypes => {
  const deleteUserStub = makeDeleteUser()
  const sut = new UserDeleteController(deleteUserStub)

  return {
    sut,
    deleteUserStub
  }
}

describe('DeleteUser Controller', () => {
  test('Should return 400 if missing id', async () => {
    const { sut } = makeSut()
    const httpRequest = {}

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(400)
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'valid_userID'
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(204)
  })

  test('Should return 500 if deleteUser usecase throws', async () => {
    const { sut, deleteUserStub } = makeSut()
    jest.spyOn(deleteUserStub, 'delete').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      params: {
        id: 'valid_userID'
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(500)
  })
})
