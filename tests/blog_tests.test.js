const list_helper = require('../utils/list_helper')


test('Always return 1 test', () => {
  const blogs = []
  const result = list_helper.dummy(blogs)
  expect(result).toBe(1)
})

test('Total likes should be 10', () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "www.test.com",
    likes: 10
  }
  const result = list_helper.totalLikes(blog)
  expect(result).toBe(10)
})

test('Should be the blog with 3 likes', () => {
  const testBlogs = [
    {
      title: "Test blog 1",
      author: "Test author 1",
      url: "www.test1.com",
      likes: 1
    },
    {
      title: "Test title 2",
      author: "Test author 2",
      url: "www.test2.com",
      likes: 2
    },
    {
      title: "Test title3",
      author: "Test author3",
      url: "www.test3.com",
      likes: 3
    }
  ]
  const result = list_helper.mostLikes(testBlogs)
  expect(result).toBe(testBlogs[2])
})