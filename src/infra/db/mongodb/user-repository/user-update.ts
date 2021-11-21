import { UpdateUserRepository } from '../../../../data/protocols/update-user-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { UserModel } from '../../../../domain/models/user'
import { ObjectId } from 'mongodb'
import { userMapper } from './user-mapper'

export class UpdateUserMongoRepository implements UpdateUserRepository {
  async update (userData: UserModel): Promise<UserModel> {
    const { id, name, username, primaryPhone, birthdate, address, addressNumber, description } = userData
    const userCollection = MongoHelper.getCollection('users')

    await userCollection.updateOne({ _id: new ObjectId(id) },
      {
        $set: {
          name,
          username,
          birthdate: new Date(birthdate),
          primaryPhone,
          address,
          addressNumber,
          description
        }
      })

    const updatedUser = await userCollection.findOne({ _id: new ObjectId(id) })

    return userMapper(updatedUser)
  }
}
