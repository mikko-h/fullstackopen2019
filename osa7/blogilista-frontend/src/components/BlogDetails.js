import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification, TYPE_ERROR } from '../reducers/notificationReducer'

const BlogDetails = (props) => {
  const { blog } = props

  const handleLikeClick = async () => {
    try {
      await props.likeBlog(blog)
    } catch (exception) {
      props.setNotification('Failed to like a blog', TYPE_ERROR)
    }
  }

  const handleRemoveClick = async () => {
    const confirmation = window.confirm(`remove blog ${blog.title} by ${blog.author}?`)

    if (confirmation) {
      try {
        await props.removeBlog(blog, props.login.token)
      } catch (exception) {
        props.setNotification('Failed to remove a blog', TYPE_ERROR)
      }
    }
  }

  const removable = blog && blog.user && blog.user.username === props.login.username

  return blog === undefined ? null : (
    <div className='blog-details'>
      <h3>{blog.title} {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={handleLikeClick}>like</button></div>
      {blog.user && <div>added by {blog.user.name}</div>}
      {removable && <button onClick={handleRemoveClick}>remove</button>}
      <h4>comments</h4>
      <CommentForm blog={blog} />
      {blog.comments.length > 0 &&
        <ul>
          {blog.comments.map((comment, i) => <li key={`${blog.id}-${i}`}>{comment}</li>)}
        </ul>}
    </div>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string
    }),
  })
}

const mapStateToProps = ({ blogs, login }, { id }) => ({
  blog: blogs.find(blog => blog.id === id),
  login
})

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetails)
