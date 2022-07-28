const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')


describe('when there is initially one user in db', () => {
  
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({
      username: 'root', 
      name: 'SuperUser', 
      passwordHash: passwordHash
    })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'TestUser',
      name: 'Test User',
      password: 'Test12345'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('checking that a username cannot be added twice', async () => {
    const usersAtStart = helper.usersInDb()
    const duplicateUser = {
      username: 'root', 
      name: 'SuperUser', 
      passwordHash: '12345'
    }
    const result = await api
      .post('/api/users')
      .send(duplicateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    console.log(result.body)
    expect(result.body.error).toContain('username must be unique')
    const usersAtEnd = helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }) 

  
})

afterAll(() => {
  mongoose.connection.close()
})