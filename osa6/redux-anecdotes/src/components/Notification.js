import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'

const Notification = ({ notification, resetNotification: propResetNotification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  useEffect(() => {
    const timer = setTimeout(() => propResetNotification(), 5000)
    return () => clearTimeout(timer)
  },  [notification, propResetNotification])

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = ({ notification }) => ({ notification })

const mapDispatchToProps = {
  resetNotification
}

const ConnectedNotification = connect(mapStateToProps, mapDispatchToProps)(Notification)
export default ConnectedNotification
