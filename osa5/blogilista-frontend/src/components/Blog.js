import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, removable, onLikeClick, onRemoveClick }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const expandStyle = {
    cursor: 'pointer'
  }

  const [expanded, setExpanded] = useState(false)

  const blogDetails = () => (
    <div className='blog-details'>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => onLikeClick(blog)}>like</button></div>
      {blog.user && <div>added by {blog.user.name}</div>}
      {removable && <button onClick={() => onRemoveClick(blog)}>remove</button>}
    </div>
  )

  return (
    <div style={blogStyle}>
      <div className='blog-title' style={expandStyle} onClick={() => setExpanded(!expanded)}>{blog.title} {blog.author}</div>
      {expanded && blogDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string
    }),
  }),
  removable: PropTypes.bool.isRequired,
  onLikeClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired
}

export default Blog
