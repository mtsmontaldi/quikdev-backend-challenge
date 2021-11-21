import { MongoHelper } from '../helpers/mongo-helper'
import { UserListMongoRepository } from './user-list'

describe('User List Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const userCollection = MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  test('Should return an array of users', async () => {
    const sut = new UserListMongoRepository()
    const userCollection = MongoHelper.getCollection('users')
    await userCollection.insertMany([{
      name: 'any_name',
      username: 'any_username',
      birthdate: new Date('2001-06-23'),
      primaryPhone: '(11) 11111-1111',
      address: 'any_address',
      addressNumber: 'any_address_number',
      description: 'any_description'
    }, {
      name: 'any_name2',
      username: 'any_username2',
      birthdate: new Date('2001-06-23'),
      primaryPhone: '(22) 2222-2222',
      address: 'any_address2',
      addressNumber: 'any_address_number2',
      description: 'any_description2'
    }])
    const user = await sut.list()

    expect(user).toBeTruthy()
  })
})
