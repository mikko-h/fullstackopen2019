import React from 'react'
import PropTypes from 'prop-types'

export const GenericField = ({
  type,
  id,
  label,
  value,
  onChange
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      value={value}
      id={id}
      onChange={onChange}
    />
  </div>
)

GenericField.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export const TextField = (props) => (
  <GenericField type="text" {...props} />
)

export const PasswordField = (props) => (
  <GenericField type="password" {...props} />
)
