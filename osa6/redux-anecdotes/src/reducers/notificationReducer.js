const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return initialState;
    default:
      return state
  }
}

const delay = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000))

export const setNotification = (data, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data
    })

    await delay(timeout)

    dispatch({
      type: 'RESET_NOTIFICATION'
    })
  }
}

export default notificationReducer
