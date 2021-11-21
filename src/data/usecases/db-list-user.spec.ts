import { ListUserRepository } from '../protocols/list-user-repository'
import { DbListUser } from './db-list-user'
import { UserModel } from '../../domain/models/user'

const makeListUserRepositoryStub = (): ListUserRepository => {
  class ListUserRepositoryStub implements ListUserRepository {
    async list (): Promise<UserModel[]> {
      const fakeList = [
        {
          id: 'valid_id',
          name: 'valid_name',
          username: 'valid_username',
          address: 'valid_address',
          addressNumber: 'valid_address_number',
          birthdate: new Date('2001-06-23'),
          primaryPhone: '(11) 11111-1111',
          description: 'valid_description',
          createdAt: new Date('2021-10-21')
        },
        {
          id: 'valid_id2',
          name: 'valid_name2',
          username: 'valid_username2',
          address: 'valid_address2',
          addressNumber: 'valid_address_number2',
          birthdate: new Date('2001-06-23'),
          primaryPhone: '(22) 2222-2222',
          description: 'valid_description',
          createdAt: new Date('2021-10-21')
        }
      ]

      return await new Promise(resolve => resolve(fakeList))
    }
  }

  return new ListUserRepositoryStub()
}

interface SutTypes {
  sut: DbListUser
  listUserRepositoryStub: ListUserRepository
}

const makeSut = (): SutTypes => {
  const listUserRepositoryStub = makeListUserRepositoryStub()
  const sut = new DbListUser(listUserRepositoryStub)

  return {
    sut,
    listUserRepositoryStub
  }
}

describe('DbListUser Usecase', () => {
  test('Should call ListUserRepository', async () => {
    const { sut, listUserRepositoryStub } = makeSut()
    const listUserRepositoryStubSpy = jest.spyOn(listUserRepositoryStub, 'list')

    await sut.list()

    expect(listUserRepositoryStubSpy).toHaveBeenCalled()
  })
})
