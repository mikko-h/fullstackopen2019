import React, { useEffect } from 'react'
import { resetNotification } from '../reducers/notificationReducer'

const Notification = ({ store: { dispatch, getState } }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notification = getState().notification

  useEffect(() => {
    const timer = setTimeout(() => dispatch(resetNotification()), 5000)
    return () => clearTimeout(timer)
  },  [dispatch, notification])

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
