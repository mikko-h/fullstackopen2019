import React from 'react'

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

export default Notification
