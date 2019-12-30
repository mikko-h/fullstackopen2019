import React from 'react'
import PropTypes from 'prop-types'
import { GenericField } from './Fields'

const LoginForm = ({
  username,
  password,
  onSubmit
}) => (
  <form onSubmit={onSubmit}>
    <GenericField
      id="username"
      label="Username:"
      {...username}
    />
    <GenericField
      id="password"
      label="Password:"
      {...password}
    />
    <button type="submit">Log in</button>
  </form>
)

const fieldType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
})

LoginForm.propTypes = {
  username: fieldType,
  password: fieldType,
  onSubmit: PropTypes.func.isRequired
}

export default LoginForm
