import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('User Routes', () => {
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
    await request(app)
      .post('/api/user')
      .send({
        name: 'any_name',
        username: 'any_username',
        birthdate: new Date('2021-06-23'),
        address: 'any_address',
        addressNumber: 'any_address',
        primaryPhone: '(11) 1111-1111',
        description: 'any_description'
      })
      .expect(201)
  })
})
