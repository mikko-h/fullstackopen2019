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

export const setNotification = (data) => ({
  type: 'SET_NOTIFICATION',
  data
})

export const resetNotification = () => ({
  type: 'RESET_NOTIFICATION'
})

export default notificationReducer
