import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from '../components/Blog'
const BlogList = () => {

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await blogService.getAll()
      console.log(response)
      setBlogs( response )
    }
    fetchData()
  },[])

  const sortByLikes = () => {
    setBlogs(blogs.sort((a,b) => a.likes - b.likes))
    console.log(blogs)
  }


  return (
    <div>
      <button onClick={sortByLikes}>Sort by likes</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

}

export default BlogList