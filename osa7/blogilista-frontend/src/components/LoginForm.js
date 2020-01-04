import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GenericField } from './Fields'
import { useField } from '../hooks'
import { loginUser } from '../reducers/loginReducer'
import { setNotification, TYPE_ERROR } from '../reducers/notificationReducer'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await props.loginUser({
        username: username.value,
        password: password.value
      })
    } catch (err) {
      props.setNotification('Invalid username or password', TYPE_ERROR)
      username.reset()
      password.reset()
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <GenericField
        id="username"
        label="Username:"
        data-cy="username"
        {...username}
      />
      <GenericField
        id="password"
        label="Password:"
        data-cy="password"
        {...password}
      />
      <button data-cy="login" type="submit">Log in</button>
    </form>
  )
}

const mapDispatchToProps = {
  loginUser,
  setNotification
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(LoginForm)
