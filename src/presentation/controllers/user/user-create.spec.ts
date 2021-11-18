import { UserCreateController } from './user-create'
import { MissingParamError } from '../../errors/missing-param-error'

interface SutTypes {
  sut: UserCreateController
}

const makeSut = (): SutTypes => {
  const sut = new UserCreateController()
  return {
    sut
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
      birthdate: 'valid_birthdate',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      name: 'valid_name',
      username: 'valid_username',
      birthdate: 'valid_birthdate',
      address: 'valid_address',
      addressNumber: 'valid_address_number',
      primaryPhone: '(11) 11111-1111',
      description: 'valid_description'
    })
  })
})
