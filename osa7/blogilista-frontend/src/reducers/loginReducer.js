import loginService from '../services/login'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN_USER':
    return action.data
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const loggedInUser = await loginService.login(credentials)
    dispatch({
      type: 'LOGIN_USER',
      data: loggedInUser
    })
  }
}

export const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

export default loginReducer
