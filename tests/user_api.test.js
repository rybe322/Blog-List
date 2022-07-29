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
    const usersAtStart = await helper.usersInDb()
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
    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toEqual(usersAtStart)
  }) 

})

describe('Testing username and password must be set and proper length',  () => {
  test('Checking that a username must be set', async () => {
    const usersAtStart = await helper.usersInDb()
    const noUsername = {
      username: '',
      name: 'Bad user',
      password: 'Shouldnt work'
    }
    const result = await api.
      post('/api/users')
      .send(noUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('Checking that a password must be set', async () => {
    const usersAtStart = await helper.usersInDb()
    const noPassword = {
      username: 'No password',
      name: 'Shouldnt work',
      password: ''
    }
    const result = await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('Checking that a username must be at least 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()
    const usernameTooShort = {
      username: 'xx',
      name: 'Too short',
      password: 'Too short'
    }
    const result = await api
      .post('/api/users')
      .send(usernameTooShort)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('Checking that a password must be at least 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()
    const passwordTooShort = {
      username: 'Password too short',
      name: 'Too short',
      password: 'xx'
    }
    const result = await api
      .post('/api/users')
      .send(passwordTooShort)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })


})


afterAll(() => {
  mongoose.connection.close()
})