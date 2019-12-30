const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'RESET_NOTIFICATION':
    return initialState
  default:
    return state
  }
}

const delay = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000))

export const TYPE_ERROR = 'error'
export const TYPE_SUCCESS = 'success'

export const setNotification = (message, type = TYPE_SUCCESS, timeout = 5) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
        type
      }
    })

    await delay(timeout)

    dispatch({
      type: 'RESET_NOTIFICATION'
    })
  }
}

export default notificationReducer
