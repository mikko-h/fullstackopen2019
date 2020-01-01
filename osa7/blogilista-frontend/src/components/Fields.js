import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Field = styled.div`
  display: flex;
  align-items: baseline;

  > :first-child {
    padding-right: 5px;
    width: 20%;
  }

  > :last-child {
    width: 50%;
  }
`

const Input = styled.input`
  border: 1px solid #1E2749;
  font-family: inherit;
  font-size: inherit;
  margin-bottom: 5px;
  padding: 5px;
`

export const GenericField = ({
  type,
  id,
  label,
  value,
  onChange
}) => (
  <Field>
    <label htmlFor={id}>{label}</label>
    <Input
      type={type}
      value={value}
      id={id}
      onChange={onChange}
    />
  </Field>
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
