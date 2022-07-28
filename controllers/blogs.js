/*
ROUTE HANDLERS = CONTROLLERS
*/
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
  const blog = new Blog(request.body)
  if (blog.likes === undefined) {
    blog.likes = 0
  }
  try{
    const savedBlog = await blog.save()
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
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter