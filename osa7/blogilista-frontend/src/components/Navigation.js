import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { logoutUser } from '../reducers/loginReducer'

const Nav = styled.nav`
  align-items: baseline;
  background: #30343F;
  color: #FAFAFF;
  display: flex;

  a {
    color: #E4D9FF;
  }

  span {
    flex-grow: 1;
    text-align: right;
  }

  > * {
    margin: 5px;
  }
`

const Navigation = (props) => props.login === null ? null : (
  <Nav>
    <Link to="/">Blogs</Link>
    <Link data-cy="linkusers" to="/users">Users</Link>
    <span>{props.login.name} logged in</span>
    <button data-cy="logout" onClick={props.logoutUser}>Log out</button>
  </Nav>
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
