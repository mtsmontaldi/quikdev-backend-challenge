import { Controller, HttpResponse } from '../../protocols'
import { MissingParamError } from '../../errors/missing-param-error'

export class UserCreateController implements Controller {
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

    return {
      statusCode: 201,
      body: {
        name,
        username,
        birthdate,
        address,
        addressNumber,
        primaryPhone,
        description
      }
    }
  }
}
