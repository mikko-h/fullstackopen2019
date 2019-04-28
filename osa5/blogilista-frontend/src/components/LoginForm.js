import React from 'react'

const LoginForm = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit
}) => (
  <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        value={username}
        id="username"
        onChange={onUsernameChange}
      />
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        value={password}
        id="password"
        onChange={onPasswordChange}
      />
    </div>
    <button type="submit">Log in</button>
  </form>
)

export default LoginForm
