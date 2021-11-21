import { MongoHelper } from '../helpers/mongo-helper'
import { UserDeleteMongoRepository } from './user-delete'

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

  test('Should return true on success', async () => {
    const sut = new UserDeleteMongoRepository()
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

    const response = await sut.delete(insertedId.toString())

    expect(response).toBe(true)
  })

  test('Should return false if user is not found', async () => {
    const sut = new UserDeleteMongoRepository()
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

    const response = await sut.delete('6199d0badae29a01dfaab2a9')

    expect(response).toBe(false)
  })

  test('Should return false if a invalid_id is provided', async () => {
    const sut = new UserDeleteMongoRepository()
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

    const response = await sut.delete('invalid_id')

    expect(response).toBe(false)
  })
})
