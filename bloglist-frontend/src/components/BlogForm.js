/*
const BlogForm = ({
  onSubmit,
  title,
  titleChange,
  author,
  authorChange,
  url,
  urlChange,
  likes,
  likesChange
}) => {
  return (
    <div>
      <h2>Create a new Blog entry</h2>
      <form onSubmit={onSubmit}>
      <b>Title:</b>
      <input
        value={title}
        onChange={titleChange}
      />
      <br />
      <b>AUTHOR: </b>
      <input
        value={author}
        onChange={authorChange}
      />
      <br />
      <b>URL: </b>
      <input
        value={url}
        onChange={urlChange}
      />
      <br />
      <b>LIKES: </b>
      <input
      value={likes}
      onChange={likesChange}
      />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}
*/
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    console.log('hello from addblog')

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }
  return (
    <div className='formDiv'>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <b>Title:</b>
        <input
          id='titleInput'
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
          placeholder='write the title here'
        />
        <br />
        <b>AUTHOR: </b>
        <input
          id='authorInput'
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
        <br />
        <b>URL: </b>
        <input
          id='urlInput'
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />
        <br />
        <b>LIKES: </b>
        <input
          id='likesInput'
          value={newLikes}
          onChange={({ target }) => setNewLikes(target.value)}
        />
        <br />
        <button id='submit-blog-button' type='submit'>save</button>
      </form>
    </div>
  )
}

export default BlogForm