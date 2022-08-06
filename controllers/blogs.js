/*
ROUTE HANDLERS = CONTROLLERS
*/
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log('authorization from getTokenFrom', authorization)
    console.log('authorization.substring(7): ', authorization.substring(7))
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})
  console.log('Hello from blogsRouter.get', blogs)
  response.json(blogs)
  /*
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      */
})
  
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if(blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(request.body)

  blog.user = user._id

  console.log('blog after adding id', blog)
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  try{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  /*
  console.log("HELLO FROM PUT")
  console.log('request.params', request.params)
  console.log('request.body', request.body)
  console.log('request.body.likes', request.body.likes)
  */
  try {
    const blogToUpdate = await Blog.findById(request.params.id)
    blogToUpdate.likes = request.body.likes
    const savedBlog = await blogToUpdate.save()
    response.status(200).json(savedBlog)
  } catch (exception){
    next(exception)
  }
})
  
blogsRouter.delete('/:id', async (request, response, next) => {
  
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  try {
    console.log('token from delete', token)
    console.log('decodedToken: ', decodedToken)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid'})
    }
  } catch(exception) {
    return response.status(400).json({ error: 'bad request'})
  }

  try {
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    //console.log('user: ', user.id.toString())
    //console.log('blog: ', blog.user.toString())
    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
    
  } catch (exception) {
    next(exception)
  }


})

module.exports = blogsRouter