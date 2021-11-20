import request from 'supertest'
import app from '../config/app'

describe('User Routes', () => {
  test('Should return an user on success', async () => {
    await request(app)
      .post('/api/user')
      .send({
        name: 'any_name',
        username: 'any_username',
        birthdate: new Date('2021-06-23'),
        address: 'any_address',
        addressNumber: 'any_address',
        description: 'any_description'
      })
      .expect(200)
  })
})
