import { useState } from 'react'
import blogService from '../services/blogs'

const Button = ({ message, onClick }) => {
  return (
    <button onClick={onClick}>{message}</button>
  )
}

const Blog = ({ blog }) => {
  const [isDetailedView, setIsDetailedView] = useState(false)
  const [newLikes, setNewLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleIsDetailView = () => {
    console.log('isDetailedView before', isDetailedView)
    setIsDetailedView(!isDetailedView)
    console.log('isDetailedView after', isDetailedView)
  }

  const handleLikedBlog = async () => {
    blog.likes += 1
    try{
      const response = await blogService.update(blog)
      console.log(response)
      setNewLikes(response.likes)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleDeleteBlog = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')){
      try{
        const response = await blogService.remove(blog)
        console.log('hello you just deleted: ', response)
      }
      catch (exception) {
        console.log(exception)
      }
    }
    return null
  }

  const blogDetailedView = () => (
    <div style={blogStyle}>
      <Button message={'Hide details'} onClick={toggleIsDetailView} />
      <p>Title: {blog.title}</p>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {newLikes} <Button message={'like this blog'} onClick={handleLikedBlog} /></p>
      <Button message={'Delete'} onClick={handleDeleteBlog} />
    </div>
  )

  const blogSimpleView = () => (
    <div style={blogStyle} >
      Title: {blog.title} <Button message={'Show details'} onClick={toggleIsDetailView} />
    </div>
  )

  return (
    <div className='blog'>
      {isDetailedView ? blogDetailedView() : blogSimpleView()}
    </div>
  )
}

export default Blog