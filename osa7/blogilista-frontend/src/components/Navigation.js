import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { logoutUser } from '../reducers/loginReducer'

const Navigation = (props) => props.login === null ? null : (
  <nav className="navigation">
    <Link to="/">Blogs</Link>
    <Link to="/users">Users</Link>
    <span>{props.login.name} logged in</span>
    <button onClick={props.logoutUser}>Log out</button>
  </nav>
)

Navigation.propTypes = {
  login: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = ({ login }) => ({ login })

const mapDispatchToProps = {
  logoutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
