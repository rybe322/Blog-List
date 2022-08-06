import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import NotificationBanner from './components/NotificationBanner'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [isNotificationError, setIsNotificationError] = useState(false)

  // First loading of the page effect hook
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (username, password) => {
    //event.preventDefault()
    console.log('logging in with: ', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('user from handleLogin', user)
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotificationMessage('Bad Username or Password')
      setIsNotificationError(true)
      setTimeout(() => {
        setNotificationMessage(null)
        setIsNotificationError(false)
      }, 5000)
    }

  }
  const addBlog = (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      //const response = blogService.create(blogObject)
      setNotificationMessage(`Added blog: ${blogObject.title} from author: ${blogObject.author} at url: ${blogObject.url}`)
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    } catch (exception) {
      console.log('bad from addblog', exception.message)
    }
  }
  const loginForm = () => (<LoginForm handleLogin={handleLogin} />)

  const blogFormRef = useRef()

  const blogForm = () => {
    return(
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )}
  return (
    <div>
      <UserInfo user={user} />
      <NotificationBanner
        message={notificationMessage}
        isError={isNotificationError}
      />
      {user !== null
        ? <h2>blogs</h2>
        : <h2>login</h2>
      }

      {user === null
        ? loginForm()
        : blogForm()
      }
      {user === null
        ? null
        : <button onClick={() => { window.localStorage.clear(); setUser(null)}}>logout</button>
      }
      <br />
      <br />
      {user !== null
        ? <BlogList />
        : null
      }

    </div>
  )
}

export default App
