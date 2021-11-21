import { DeleteUserRepository } from '../../../../data/protocols/delete-user-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class UserDeleteMongoRepository implements DeleteUserRepository {
  private id: ObjectId

  async delete (userId: string): Promise<boolean> {
    try {
      const makeObjectId = new ObjectId(userId)
      this.id = makeObjectId
      const userCollection = MongoHelper.getCollection('users')
      const { deletedCount } = await userCollection.deleteOne({ _id: this.id })

      if (deletedCount > 0) {
        return true
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }
}
