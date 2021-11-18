import { Controller, HttpResponse } from '../../protocols'
import { MissingParamError } from '../../errors/missing-param-error'
import { AddUser } from '../../../domain/usecases/add-user'

export class UserCreateController implements Controller {
  private readonly addUser: AddUser

  constructor (addUser: AddUser) {
    this.addUser = addUser
  }

  async handle (httpRequest: any): Promise<HttpResponse> {
    const requiredFields = ['name', 'username', 'birthdate', 'address', 'addressNumber', 'primaryPhone', 'description']

    for (const field of requiredFields) {
      if (!httpRequest[field]) {
        return {
          statusCode: 400,
          body: new MissingParamError(field)
        }
      }
    }

    const { name, username, birthdate, address, addressNumber, primaryPhone, description } = httpRequest

    const createdAccount = await this.addUser.add({
      name,
      username,
      address,
      addressNumber,
      birthdate,
      primaryPhone,
      description
    })

    return {
      statusCode: 201,
      body: createdAccount
    }
  }
}
