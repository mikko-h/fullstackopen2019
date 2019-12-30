import userService from '../services/users'

const isUsersBlog = (user, blog) => blog.user && blog.user.id === user.id

const userReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_USERS':
    return action.data
  case 'NEW_BLOG':
    return state.map(user => isUsersBlog(user, action.data)
      ? { ...user, blogs: user.blogs.concat(action.data) }
      : user)
  case 'REMOVE_BLOG':
    return state.map(user => isUsersBlog(user, action.data)
      ? { ...user, blogs: user.blogs.filter(blog => blog.id !== action.data.id) }
      : user)
  default:
    return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userReducer
