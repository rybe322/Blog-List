const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')




beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are x notes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)
})

test('The first title should be : Test blog 1', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('Test blog 1')
})

test('all blogs are returned', async() => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is contained in the blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(blog => blog.title)

  expect(contents).toContain('Test blog 3')
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Test blog 4',
    author: 'Test author 4',
    url: 'www.test4.com',
    likes: 100
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain('Test blog 4')
})

test('a HTTP POST attempt with undefined likes gets 0 likes', async () => {
  const newBlog = {
    title: 'A blog with no likes',
    author: 'No likes author',
    url: 'www.nolikes.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  const contents = blogsAtEnd.map(blog => blog.title)
  expect(contents).toContain('A blog with no likes')
})

test('blog missing title and url is not added', async () => {
  const newBlog = {
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('getting the first blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('deleting the first blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)  
})

test('testing if the unique identifier property of the blog post is name id', async() => {
  const blogs = await api
    .get('/api/blogs')
    
  console.log('blogs', blogs.body[0])
  expect(blogs.body[0].id).toBeDefined
})

afterAll(() => {
  mongoose.connection.close()
})