import React, { useState } from 'react'

const Blog = ({ blog, onLikeClick }) => {
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
    <div>
      <a href={blog.url}>{blog.url}</a>
      <div>{blog.likes} likes <button onClick={() => onLikeClick(blog)}>like</button></div>
      {blog.user && <div>added by {blog.user.name}</div>}
    </div>
  )

  return (
    <div style={blogStyle}>
      <div style={expandStyle} onClick={() => setExpanded(!expanded)}>{blog.title} {blog.author}</div>
      {expanded && blogDetails()}
    </div>
  )
}

export default Blog
