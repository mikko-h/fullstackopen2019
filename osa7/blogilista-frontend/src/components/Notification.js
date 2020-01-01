import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Message = styled.div`
  font-size: 20px;
  border-style: solid;
  padding: 10px;
  margin-bottom: 10px;

  &.error {
    color: red;
  }

  &.success {
    color: green;
  }
`

export const TYPE_ERROR = 'error'
export const TYPE_SUCCESS = 'success'

const Notification = ({ message, type }) => {
  if (message) {
    return (
      <Message className={type}>
        {message}
      </Message>
    )
  }

  return null
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf([TYPE_ERROR, TYPE_SUCCESS])
}

const mapStateToProps = ({ notification: { message, type } }) => ({ message, type })

export default connect(mapStateToProps)(Notification)
