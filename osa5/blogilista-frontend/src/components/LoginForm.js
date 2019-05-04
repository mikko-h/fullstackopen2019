import React from 'react'
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

export default LoginForm
