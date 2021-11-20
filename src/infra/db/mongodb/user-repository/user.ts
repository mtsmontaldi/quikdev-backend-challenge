import { AddUserModel, UserModel } from './user-protocols'
import { MongoHelper } from '../helpers/mongo-helper'
import { userMapper } from './user-mapper'

export class UserMongoRepository {
  async add (userData: AddUserModel): Promise<UserModel> {
    const userCollection = MongoHelper.getCollection('users')

    const { insertedId } = await userCollection.insertOne(Object.assign({}, userData, { createdAt: new Date() }))
    const createdUser = await userCollection.findOne({ _id: insertedId })

    return userMapper(createdUser)
  }
}
