import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Link, Route
} from 'react-router-dom'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import { useField } from './hooks'
import { createBlog, initBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { setNotification, TYPE_ERROR } from './reducers/notificationReducer'
import { loginUser, logoutUser } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'
import './index.css'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    props.initUsers()
  }, [])

  const createFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.loginUser({
        username: username.value,
        password: password.value
      })
    } catch (err) {
      props.setNotification('Invalid username or password', TYPE_ERROR)
    }
    username.reset()
    password.reset()
  }

  const handleCreate = async (values) => {
    createFormRef.current.toggleVisibility()

    try {
      await props.createBlog(values, props.login.token)
      props.setNotification(`A new blog ${values.title} by ${values.author} added`)
    } catch (exception) {
      props.setNotification('Failed to create a new blog', TYPE_ERROR)
    }
  }

  const handleLikeClick = async (blog) => {
    try {
      await props.likeBlog(blog)
    } catch (exception) {
      props.setNotification('Failed to like a blog', TYPE_ERROR)
    }
  }

  const handleRemoveClick = async (blog) => {
    const confirmation = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)

    if (confirmation) {
      try {
        await props.removeBlog(blog, props.login.token)
      } catch (exception) {
        props.setNotification('Failed to remove a blog', TYPE_ERROR)
      }
    }
  }

  const isOwnBlog = blog => !!blog.user && blog.user.username === props.login.username

  const LoginPage = () => (
    <div className='login-page'>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm
        username={username}
        password={password}
        onSubmit={handleLogin}
      />
    </div>
  )

  const BlogList = () => (
    <div className='bloglist-page'>
      <Togglable buttonLabel='create new' ref={createFormRef}>
        <CreateForm handleCreate={handleCreate} />
      </Togglable>
      {props.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
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
    <Router>
      <div>
        <h1>blogs</h1>
        <Notification />
        {props.login === null ? LoginPage() :
        <>
          <Link to="/">Blogs</Link>{' '}
          <Link to="/users">Users</Link>
          <p>{props.login.name} logged in</p>
          <button onClick={props.logoutUser}>Log out</button>
          <Route exact path="/" render={BlogList} />
          <Route path="/users"><UserList /></Route>
        </>
        }
      </div>
    </Router>
  )
}

const mapStateToProps = ({ blogs, login, user }) => ({ blogs, login, user })

const mapDispatchToProps = {
  createBlog,
  initBlogs,
  initUsers,
  likeBlog,
  loginUser,
  logoutUser,
  removeBlog,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
