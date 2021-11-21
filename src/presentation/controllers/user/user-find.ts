import { Controller, HttpResponse, HttpRequest } from '../../protocols/index'
import { FindUser } from '../../../domain/usecases/find-user'

export class UserFindController implements Controller {
  private readonly findUser: FindUser

  constructor (findUser: FindUser) {
    this.findUser = findUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params

      const result = await this.findUser.find(id)

      return {
        statusCode: 200,
        body: result
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error('Server Error')
      }
    }
  }
}
