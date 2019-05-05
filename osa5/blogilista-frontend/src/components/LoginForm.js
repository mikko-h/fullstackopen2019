import React from 'react'
import PropTypes from 'prop-types'
import { TextField, PasswordField } from './Fields'

const LoginForm = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit
}) => (
  <form onSubmit={onSubmit}>
    <TextField
      id="username"
      label="Username:"
      value={username}
      onChange={onUsernameChange}
    />
    <PasswordField
      id="password"
      label="Password:"
      value={password}
      onChange={onPasswordChange}
    />
    <button type="submit">Log in</button>
  </form>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default LoginForm
