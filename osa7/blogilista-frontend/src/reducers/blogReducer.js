import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'LIKE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'COMMENT_BLOG':
    return state.map(blog => blog.id === action.data.id ? ({
      ...blog,
      comments: blog.comments.concat(action.data.comment)
    }) : blog)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog, token) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog, token)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1
    })
    dispatch({
      type: 'LIKE_BLOG',
      data: likedBlog
    })
  }
}

export const removeBlog = (blog, token) => {
  return async dispatch => {
    await blogService.remove(blog.id, token)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    await blogService.comment(blog.id, comment)
    dispatch({
      type: 'COMMENT_BLOG',
      data: {
        id: blog.id,
        comment
      }
    })
  }
}

export default blogReducer
