const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  console.log('username', username)
  console.log('password', password)

  if (!username) return response.status(400).json({error: 'username and password must be provided'})
  else if (!password) return response.status(400).json({ error: 'password must be provided'})
  else if (username.length < 3) return response.status(400).json({ error: 'username must be at least 3 characters'})
  else if (password.length < 3) return response.status(400).json({ error: 'password must be at least 3 characters'})

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'username must be unique'})
  } 

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  try { 
  const savedUser = await user.save()
  response.status(201).json(savedUser)
  }catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response, next) => {
  try{
  const users = await User
    .find({})
    .populate('blogs', {
      title: 1, author: 1, url: 1, likes: 1
    })
  response.json(users)
  }
  catch(exception) {
    next(error)
  }

})

module.exports = usersRouter