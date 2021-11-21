import { UserUpdateController } from './user-update'
import { MissingParamError } from '../../errors/missing-param-error'
import { UpdateUser } from '../../../domain/usecases/update-user'
import { UserModel } from '../../../domain/models/user'

const makeUpdateUser = (): UpdateUser => {
  class UpdateUserStub implements UpdateUser {
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

  return new UpdateUserStub()
}

interface SutTypes {
  sut: UserUpdateController
  updateUserStub: UpdateUser
}

const makeSut = (): SutTypes => {
  const updateUserStub = makeUpdateUser()
  const sut = new UserUpdateController(updateUserStub)
  return {
    sut,
    updateUserStub
  }
}

describe('UpdateUser Controller', () => {
  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: 'valid_id',
        createdAt: new Date(),
        username: 'valid_username',
        birthdate: 'valid_birthdate',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        primaryPhone: '(11) 11111-1111',
        description: 'valid_description'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ error: new MissingParamError('name').message })
  })

  test('Should return 400 if no id is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'valid_name',
        createdAt: new Date(),
        username: 'valid_username',
        birthdate: 'valid_birthdate',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        primaryPhone: '(11) 11111-1111',
        description: 'valid_description'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ error: new MissingParamError('id').message })
  })

  test('Should return 400 if no username is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: 'valid_id',
        createdAt: new Date(),
        name: 'valid_name',
        birthdate: 'valid_birthdate',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        primaryPhone: '(11) 11111-1111',
        description: 'valid_description'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ error: new MissingParamError('username').message })
  })

  test('Should return 400 if no birthdate is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: 'valid_id',
        createdAt: new Date(),
        name: 'valid_name',
        username: 'valid_username',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        primaryPhone: '(11) 11111-1111',
        description: 'valid_description'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ error: new MissingParamError('birthdate').message })
  })

  test('Should return 400 if no address is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: 'valid_id',
        createdAt: new Date(),
        name: 'valid_name',
        username: 'valid_username',
        birthdate: 'valid_birthdate',
        addressNumber: 'valid_address_number',
        primaryPhone: '(11) 11111-1111',
        description: 'valid_description'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ error: new MissingParamError('address').message })
  })

  test('Should return 400 if no addressNumber is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: 'valid_id',
        createdAt: new Date(),
        name: 'valid_name',
        username: 'valid_username',
        birthdate: 'valid_birthdate',
        address: 'valid_address',
        primaryPhone: '(11) 11111-1111',
        description: 'valid_description'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ error: new MissingParamError('addressNumber').message })
  })

  test('Should return 400 if no primaryPhone is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: 'valid_id',
        createdAt: new Date(),
        name: 'valid_name',
        username: 'valid_username',
        birthdate: 'valid_birthdate',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        description: 'valid_description'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ error: new MissingParamError('primaryPhone').message })
  })

  test('Should return 400 if no description is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: 'valid_id',
        createdAt: new Date(),
        name: 'valid_name',
        username: 'valid_username',
        birthdate: 'valid_birthdate',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        primaryPhone: '(11) 11111-1111'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ error: new MissingParamError('description').message })
  })

  test('Should return 200 if a user is updated successfully', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        id: 'valid_id',
        createdAt: new Date(),
        name: 'valid_name',
        username: 'valid_username',
        address: 'valid_address',
        addressNumber: 'valid_address_number',
        birthdate: new Date('2001-06-23'),
        primaryPhone: '(11) 11111-1111',
        description: 'valid_description'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body.id).toBeTruthy()
    expect(httpResponse.body.createdAt).toBeTruthy()
    expect(httpResponse.body.name).toBe('valid_name')
    expect(httpResponse.body.username).toBe('valid_username')
    expect(httpResponse.body.address).toBe('valid_address')
    expect(httpResponse.body.addressNumber).toBe('valid_address_number')
    expect(httpResponse.body.birthdate).toEqual(new Date('2001-06-23'))
    expect(httpResponse.body.primaryPhone).toBe('(11) 11111-1111')
    expect(httpResponse.body.description).toBe('valid_description')
  })

  test('Should return 500 if addUser throws', async () => {
    const { sut, updateUserStub } = makeSut()
    jest.spyOn(updateUserStub, 'update').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpRequest = {
      body: {
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
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new Error())
  })
})
