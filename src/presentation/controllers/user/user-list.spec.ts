import { UserListController } from './user-list'
import { ListUser } from '../../../domain/usecases/list-user'
import { UserModel } from '../../../domain/models/user'

const makeListUserStub = (): ListUser => {
  class ListUserStub implements ListUser {
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

  return new ListUserStub()
}

interface SutTypes {
  sut: UserListController
  listUserStub: ListUser
}

const makeSut = (): SutTypes => {
  const listUserStub = makeListUserStub()
  const sut = new UserListController(listUserStub)

  return {
    sut,
    listUserStub
  }
}

describe('User List Controller', () => {
  test('Should return status 200 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle()

    expect(httpResponse.statusCode).toBe(200)
  })
  test('Should call ListUser', async () => {
    const { sut, listUserStub } = makeSut()

    const listUserStubSpy = jest.spyOn(listUserStub, 'list')

    await sut.handle()

    expect(listUserStubSpy).toHaveBeenCalled()
  })
})
