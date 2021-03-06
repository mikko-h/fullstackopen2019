import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification, { TYPE_ERROR, TYPE_SUCCESS } from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'
import './index.css'

const App = () => {
  const USER_STORAGE_KEY = 'loggedInUser'

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('password')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(USER_STORAGE_KEY)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const createFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem(
        'loggedInUser',
        JSON.stringify(user)
      )

      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      showNotification('Invalid username or password', TYPE_ERROR)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }

  const handleCreate = async (values) => {
    createFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(values, user.token)
      setBlogs(blogs.concat(newBlog))
      showNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      showNotification('Failed to create a new blog', TYPE_ERROR)
    }
  }

  const handleLikeClick = async (blog) => {
    try {
      const updatedBlog = await blogService.update({
        ...blog,
        likes: blog.likes + 1
      })
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    } catch (exception) {
      showNotification('Failed to update a blog', TYPE_ERROR)
    }
  }

  const handleRemoveClick = async (blog) => {
    const confirmation = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)

    if (confirmation) {
      try {
        await blogService.remove(blog.id, user.token)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (exception) {
        showNotification('Failed to remove a blog', TYPE_ERROR)
      }
    }
  }

  const showNotification = (message, type = TYPE_SUCCESS) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const isOwnBlog = blog => !!blog.user && blog.user.username === user.username

  const loginPage = () => (
    <div className='login-page'>
      <h2>Log in to application</h2>
      <Notification {...notification} />
      <LoginForm
        username={username}
        password={password}
        onSubmit={handleLogin}
      />
    </div>
  )

  const blogList = () => (
    <div className='bloglist-page'>
      <h2>blogs</h2>
      <Notification {...notification} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Log out</button>
      <Togglable buttonLabel='create new' ref={createFormRef}>
        <CreateForm handleCreate={handleCreate} />
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          removable={isOwnBlog(blog)}
          onLikeClick={handleLikeClick}
          onRemoveClick={handleRemoveClick}
        />
      )}
    </div>
  )
  return (
    <>
      {user === null ? loginPage() : blogList()}
    </>
  )
}

export default App
