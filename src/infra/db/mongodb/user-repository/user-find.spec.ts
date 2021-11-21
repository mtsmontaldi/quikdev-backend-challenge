import { MongoHelper } from '../helpers/mongo-helper'
import { UserFindMongoRepository } from './user-find'

describe('User Find Mongo Repository', () => {
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

  test('Should return an user on success', async () => {
    const sut = new UserFindMongoRepository()
    const userCollection = MongoHelper.getCollection('users')
    const { insertedId } = await userCollection.insertOne({
      name: 'any_name',
      createdAt: new Date(),
      username: 'any_username',
      birthdate: new Date('2001-06-23'),
      primaryPhone: '(11) 11111-1111',
      address: 'any_address',
      addressNumber: 'any_address_number',
      description: 'any_description'
    })

    const user = await sut.find(insertedId.toString())

    expect(user.id).toBeTruthy()
    expect(user.createdAt).toBeTruthy()
    expect(user.name).toBe('any_name')
    expect(user.username).toBe('any_username')
    expect(user.birthdate).toBeTruthy()
    expect(user.primaryPhone).toBe('(11) 11111-1111')
    expect(user.address).toBe('any_address')
    expect(user.addressNumber).toBe('any_address_number')
    expect(user.description).toBe('any_description')
  })

  test('Should return null if there is no user with the id provided', async () => {
    const sut = new UserFindMongoRepository()
    const userCollection = MongoHelper.getCollection('users')
    await userCollection.insertOne({
      name: 'any_name',
      createdAt: new Date(),
      username: 'any_username',
      birthdate: new Date('2001-06-23'),
      primaryPhone: '(11) 11111-1111',
      address: 'any_address',
      addressNumber: 'any_address_number',
      description: 'any_description'
    })

    const user = await sut.find('6199c233482e183d755b3da3')

    expect(user).toBeNull()
  })
})
