import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { DeleteUser } from '../../../domain/usecases/delete-user'

export class UserDeleteController implements Controller {
  private readonly deleteUser: DeleteUser

  constructor (deleteUser: DeleteUser) {
    this.deleteUser = deleteUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.params) {
        return {
          statusCode: 400,
          body: new Error('Missing user ID')
        }
      }

      const { id } = httpRequest.params

      const response = await this.deleteUser.delete(id)

      if (response) {
        return {
          statusCode: 204,
          body: []
        }
      } else {
        return {
          statusCode: 400,
          body: new Error('User not found')
        }
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Server Error')
      }
    }
  }
}
