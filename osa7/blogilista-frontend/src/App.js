import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import BlogList from './components/BlogList'
import LoginPage from './components/LoginPage'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import UserList from './components/UserList'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import './index.css'

const App = (props) => {
  useEffect(() => {
    props.initBlogs()
  }, [])

  useEffect(() => {
    props.initUsers()
  }, [])

  return (
    <Router>
      <div>
        <Navigation />
        <h1>blogs</h1>
        <Notification />
        {props.login === null ? <LoginPage /> :
        <>
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

const mapStateToProps = ({ login }) => ({ login })

const mapDispatchToProps = {
  initBlogs,
  initUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
