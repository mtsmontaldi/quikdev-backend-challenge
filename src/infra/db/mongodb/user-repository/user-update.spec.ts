import { MongoHelper } from '../helpers/mongo-helper'
import { UpdateUserMongoRepository } from './user-update'

describe('UpdateUser Mongo Repository', () => {
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
    const sut = new UpdateUserMongoRepository()
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

    const user = await sut.update({
      id: insertedId.toString(),
      createdAt: new Date(),
      name: 'any_name2',
      username: 'any_username2',
      birthdate: new Date('2001-06-23'),
      primaryPhone: '(11) 11111-1111',
      address: 'any_address2',
      addressNumber: 'any_address_number2',
      description: 'any_description'
    })

    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.createdAt).toBeTruthy()
    expect(user.name).toBe('any_name2')
    expect(user.username).toBe('any_username2')
    expect(user.address).toBe('any_address2')
    expect(user.addressNumber).toBe('any_address_number2')
    expect(user.birthdate).toEqual(new Date('2001-06-23'))
    expect(user.primaryPhone).toBe('(11) 11111-1111')
    expect(user.description).toBe('any_description')
  })
})
