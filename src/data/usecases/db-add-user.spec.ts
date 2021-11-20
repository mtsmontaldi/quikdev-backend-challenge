import { DbAddUser } from './db-add-user'
import { AddUserRepository, AddUserModel, UserModel } from './db-add-user-protocols'

const makeAddUserRepositoryStub = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add (userData: AddUserModel): Promise<UserModel> {
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

  return new AddUserRepositoryStub()
}

interface sutTypes {
  sut: DbAddUser
  addUserRepositoryStub: AddUserRepository
}

const makeSut = (): sutTypes => {
  const addUserRepositoryStub = makeAddUserRepositoryStub()
  const sut = new DbAddUser(addUserRepositoryStub)

  return {
    sut,
    addUserRepositoryStub
  }
}

describe('DbAddUser Usecase', () => {
  test('Should call AddUserRepository with correct user data', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addUserRepositorySpy = jest.spyOn(addUserRepositoryStub, 'add')

    const userData = {
      name: 'valid_name',
      username: 'valid_username',
      birthdate: new Date('2021-06-23'),
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    }

    await sut.add(userData)

    expect(addUserRepositorySpy).toHaveBeenCalledWith({
      name: 'valid_name',
      username: 'valid_username',
      birthdate: new Date('2021-06-23'),
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    })
  })
})
