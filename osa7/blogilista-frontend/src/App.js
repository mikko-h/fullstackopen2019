import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Link, Route
} from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import UserList from './components/UserList'
import { useField } from './hooks'
import { initBlogs } from './reducers/blogReducer'
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
          <Route exact path="/"><BlogList /></Route>
          <Route exact path="/blogs/:id" render={({ match }) =>
            <BlogDetails id={match.params.id} />
          } />
          <Route exact path="/users"><UserList /></Route>
          <Route exact path="/users/:id" render={({ match }) =>
            <UserInfo id={match.params.id} />
          } />
        </>
        }
      </div>
    </Router>
  )
}

const mapStateToProps = ({ blogs, login, user }) => ({ blogs, login, user })

const mapDispatchToProps = {
  initBlogs,
  initUsers,
  loginUser,
  logoutUser,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
