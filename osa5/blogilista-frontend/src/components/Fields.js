import React from 'react'

const GenericField = ({
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

export const TextField = (props) => (
  <GenericField type="text" {...props} />
)

export const PasswordField = (props) => (
  <GenericField type="password" {...props} />
)
