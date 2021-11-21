import { UserModel } from './user-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { userMapper } from './user-mapper'
import { ObjectId } from 'mongodb'
import { FindUserRepository } from '../../../../data/protocols/find-user-repository'

export class UserFindMongoRepository implements FindUserRepository {
  async find (userId: string): Promise<UserModel> {
    const userCollection = MongoHelper.getCollection('users')

    const user = await userCollection.findOne({ _id: new ObjectId(userId) })

    if (!user) {
      return null
    } else {
      return userMapper(user)
    }
  }
}
