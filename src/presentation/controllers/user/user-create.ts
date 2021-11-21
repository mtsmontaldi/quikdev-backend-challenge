import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { MissingParamError } from '../../errors/missing-param-error'
import { AddUser } from '../../../domain/usecases/add-user'

export class UserCreateController implements Controller {
  private readonly addUser: AddUser

  constructor (addUser: AddUser) {
    this.addUser = addUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'username', 'birthdate', 'address', 'addressNumber', 'primaryPhone', 'description']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return {
            statusCode: 400,
            body: { error: new MissingParamError(field).message }
          }
        }
      }

      const { name, username, birthdate, address, addressNumber, primaryPhone, description } = httpRequest.body

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
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error()
      }
    }
  }
}
