import { Controller, HttpResponse } from '../../protocols'
import { ListUser } from '../../../domain/usecases/list-user'

export class UserListController implements Controller {
  private readonly listUser: ListUser

  constructor (listUser: ListUser) {
    this.listUser = listUser
  }

  async handle (): Promise<HttpResponse> {
    try {
      const result = await this.listUser.list()

      return {
        statusCode: 200,
        body: result
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new Error()
      }
    }
  }
}
