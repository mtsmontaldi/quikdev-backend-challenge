import { DbUpdateUser } from './db-update-user'
import { UpdateUserRepository } from '../protocols/update-user-repository'
import { UserModel } from '../../domain/models/user'
import { UpdateUser } from '../../domain/usecases/update-user'

const makeUpdateUserRepositoryStub = (): UpdateUserRepository => {
  class UpdateUserRepositoryStub implements UpdateUser {
    async update (user: UserModel): Promise<UserModel> {
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

  return new UpdateUserRepositoryStub()
}

interface SutTypes {
  sut: DbUpdateUser
  updateUserRepositoryStub: UpdateUserRepository
}

const makeSut = (): SutTypes => {
  const updateUserRepositoryStub = makeUpdateUserRepositoryStub()
  const sut = new DbUpdateUser(updateUserRepositoryStub)

  return {
    sut,
    updateUserRepositoryStub
  }
}

describe('DbUpdateUser Usecase', () => {
  test('Should call updateUserRepository with correct user data', async () => {
    const { sut, updateUserRepositoryStub } = makeSut()
    const updateUserRepositoryStubSpy = jest.spyOn(updateUserRepositoryStub, 'update')

    const userData = {
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

    await sut.update(userData)

    expect(updateUserRepositoryStubSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      name: 'valid_name',
      username: 'valid_username',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      birthdate: new Date('2001-06-23'),
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description',
      createdAt: new Date('2021-10-21')
    })
  })
})
