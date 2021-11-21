import { DbFindUser } from './db-find-user'
import { FindUserRepository } from '../protocols/find-user-repository'
import { UserModel } from '../../domain/models/user'

const makeFindUserRepositoryStub = (): FindUserRepository => {
  class FindUserRepositoryStub implements FindUserRepository {
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

  return new FindUserRepositoryStub()
}

interface SutTypes {
  sut: DbFindUser
  findUserRepositoryStub: FindUserRepository
}

const makeSut = (): SutTypes => {
  const findUserRepositoryStub = makeFindUserRepositoryStub()
  const sut = new DbFindUser(findUserRepositoryStub)

  return {
    sut,
    findUserRepositoryStub
  }
}

describe('DbFindUser Usecase', () => {
  test('Should calls FindUserRepository with correct id', async () => {
    const { sut, findUserRepositoryStub } = makeSut()
    const findUserRepositoryStubSpy = jest.spyOn(findUserRepositoryStub, 'find')

    await sut.find('valid_id')

    expect(findUserRepositoryStubSpy).toHaveBeenCalled()
  })
})
