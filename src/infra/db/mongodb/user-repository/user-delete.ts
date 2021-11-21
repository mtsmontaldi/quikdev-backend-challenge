import { DeleteUserRepository } from '../../../../data/protocols/delete-user-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class UserDeleteMongoRepository implements DeleteUserRepository {
  private id: ObjectId

  async delete (userId: string): Promise<boolean> {
    const userCollection = MongoHelper.getCollection('users')
    try {
      const makeObjectId = new ObjectId(userId)
      this.id = makeObjectId
    } catch (error) {
      return false
    }
    const { deletedCount } = await userCollection.deleteOne({ _id: new ObjectId(userId) })

    if (deletedCount > 0) {
      return true
    } else {
      return false
    }
  }
}
