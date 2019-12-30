import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const TYPE_ERROR = 'error'
export const TYPE_SUCCESS = 'success'

const Notification = ({ message, type }) => {
  if (message) {
    return (
      <div className={type}>
        {message}
      </div>
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
