import { UserFindController } from './user-find'
import { FindUser } from '../../../domain/usecases/find-user'
import { UserModel } from '../../../domain/models/user'

const makeFindUserStub = (): FindUser => {
  class FindUserStub implements FindUser {
    async find (userId: string): Promise<UserModel> {
      const fakeUser = {
        id: 'valid_id',
        name: 'valid_name',
        username: 'valid_username',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        birthdate: new Date('2001-06-23'),
        primaryPhone: '(11) 11111-1111',
        description: 'valid_description',
        createdAt: new Date('2021-10-21')
      }

      return await new Promise(resolve => resolve(fakeUser))
    }
  }

  return new FindUserStub()
}

interface SutTypes {
  sut: UserFindController
  findUserStub: FindUser
}

const makeSut = (): SutTypes => {
  const findUserStub = makeFindUserStub()
  const sut = new UserFindController(findUserStub)

  return {
    sut,
    findUserStub
  }
}

describe('FindUser Controller', () => {
  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        id: 'valid_id'
      }
    }

    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(200)
  })

  test('Should return 500 if FindUser usecase throws', async () => {
    const { sut, findUserStub } = makeSut()
    jest.spyOn(findUserStub, 'find').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      params: {
        id: 'valid_id'
      }
    }
    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(500)
  })
})
