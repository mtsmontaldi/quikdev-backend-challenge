import { UserCreateController } from './user-create'
import { MissingParamError } from '../../errors/missing-param-error'
import { AddUser, AddUserModel } from '../../../domain/usecases/add-user'
import { UserModel } from '../../../domain/models/user'

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (user: AddUserModel): Promise<UserModel> {
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

  return new AddUserStub()
}

interface SutTypes {
  sut: UserCreateController
  addUserStub: AddUser
}

const makeSut = (): SutTypes => {
  const addUserStub = makeAddUser()
  const sut = new UserCreateController(addUserStub)
  return {
    sut,
    addUserStub
  }
}

describe('CreateUser Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      username: 'valid_username',
      birthdate: 'valid_birthdate',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return 400 if no username is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      name: 'valid_name',
      birthdate: 'valid_birthdate',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('username'))
  })

  test('Should return 400 if no birthdate is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      name: 'valid_name',
      username: 'valid_username',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('birthdate'))
  })

  test('Should return 400 if no address is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      name: 'valid_name',
      username: 'valid_username',
      birthdate: 'valid_birthdate',
      addressNumber: 'valid_address_number',
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('address'))
  })

  test('Should return 400 if no addressNumber is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      name: 'valid_name',
      username: 'valid_username',
      birthdate: 'valid_birthdate',
      address: 'valid_address',
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('addressNumber'))
  })

  test('Should return 400 if no primaryPhone is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      name: 'valid_name',
      username: 'valid_username',
      birthdate: 'valid_birthdate',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      description: 'valid_description'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('primaryPhone'))
  })

  test('Should return 400 if no description is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      name: 'valid_name',
      username: 'valid_username',
      birthdate: 'valid_birthdate',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      primaryPhone: '(11) 11111-1111'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('description'))
  })

  test('Should return 201 if a user is created successfully', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      name: 'valid_name',
      username: 'valid_username',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      birthdate: new Date('2001-06-23'),
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
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

  test('Should return 500 if addUser throws', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      name: 'valid_name',
      username: 'valid_username',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      birthdate: new Date('2001-06-23'),
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error())
  })
})
