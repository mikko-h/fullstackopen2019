const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
      username: 'root',
      passwordHash: await helper.hashPassword('sekret')
    })
    await user.save()
  })

  test('login succeeds with valid username and password', async () => {
    const loginUser = {
      username: 'root',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const validToken = await helper.tokenForUser(loginUser.username)

    expect(result.body.token).toBe(validToken)
  })

  test('login fails with invalid username', async () => {
    const loginUser = {
      username: 'invalid',
      password: 'sekret'
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.token).toBeUndefined()
  })

  test('login fails with invalid password', async () => {
    const loginUser = {
      username: 'root',
      password: 'invalid'
    }

    const result = await api
      .post('/api/login')
      .send(loginUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.token).toBeUndefined()
  })

  test('login fails without credentials', async () => {
    const loginUser = {}

    const result = await api
      .post('/api/login')
      .send(loginUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(result.body.token).toBeUndefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
