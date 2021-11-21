import { UserModel } from './user-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { userMapper } from './user-mapper'
import { ListUserRepository } from '../../../../data/protocols/list-user-repository'

export class UserListMongoRepository implements ListUserRepository {
  async list (): Promise<UserModel[]> {
    const userCollection = MongoHelper.getCollection('users')
    const usersArray = []

    const result = await userCollection.find().toArray()
    result.map((current) => {
      const user = userMapper(current)

      return usersArray.push(user)
    })

    return usersArray
  }
}
