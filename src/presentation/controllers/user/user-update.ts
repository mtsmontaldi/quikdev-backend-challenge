import { Controller, HttpResponse, HttpRequest } from '../../protocols'
import { MissingParamError } from '../../errors/missing-param-error'
import { UpdateUser } from '../../../domain/usecases/update-user'

export class UserUpdateController implements Controller {
  private readonly updateUser: UpdateUser

  constructor (updateUser: UpdateUser) {
    this.updateUser = updateUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['id', 'createdAt', 'name', 'username', 'birthdate', 'address', 'addressNumber', 'primaryPhone', 'description']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return {
            statusCode: 400,
            body: {
              error: new MissingParamError(field).message
            }
          }
        }
      }

      const { id, createdAt, name, username, birthdate, address, addressNumber, primaryPhone, description } = httpRequest.body

      const updatedAccount = await this.updateUser.update({
        id,
        createdAt,
        name,
        username,
        address,
        addressNumber,
        birthdate,
        primaryPhone,
        description
      })

      return {
        statusCode: 200,
        body: updatedAccount
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error()
      }
    }
  }
}
