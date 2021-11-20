import { MongoHelper } from '../helpers/mongo-helper'
import { UserMongoRepository } from './user'

describe('User Mongo Repository', () => {
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
    const sut = new UserMongoRepository()
    const user = await sut.add({
      name: 'any_name',
      username: 'any_username',
      birthdate: new Date('2001-06-23'),
      primaryPhone: '(11) 11111-1111',
      address: 'any_address',
      addressNumber: 'any_address_number',
      description: 'any_description'
    })

    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.createdAt).toBeTruthy()
    expect(user.name).toBe('any_name')
    expect(user.username).toBe('any_username')
    expect(user.address).toBe('any_address')
    expect(user.addressNumber).toBe('any_address_number')
    expect(user.birthdate).toEqual(new Date('2001-06-23'))
    expect(user.primaryPhone).toBe('(11) 11111-1111')
    expect(user.description).toBe('any_description')
  })
})
