const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Test blog 1",
    author: "Test author 1",
    url: "www.test1.com",
    likes: 1
  },
  {
    title: "Test blog 2",
    author: "Test author 2",
    url: "www.test2.com",
    likes: 2
  },
  {
    title: "Test blog 3",
    author: "Test author 3",
    url: "www.test3.com",
    likes: 3
  },
]

const nonExistingId = async() => {
  const blog = newBlog({
    title: 'Will remove',
    author: 'Temp author',
    url: 'www.temp.com',
    likes: 0
  })

  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}