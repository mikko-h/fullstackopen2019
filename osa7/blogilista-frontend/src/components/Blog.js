import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Item = styled.div`
  background: #FAFAFF;
  border: 1px dotted transparent;
  border-left: 5px solid #273469;
  margin-top: 10px;
  padding: 5px;

  &:hover {
    border-color: #273469;
  }

  a {
    text-decoration: none;
  }
`

const Blog = ({ blog }) => (
  <Item>
    <Link to={`/blogs/${blog.id}`} className='blog-title'>{blog.title} {blog.author}</Link>
  </Item>
)

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }),
}

export default Blog
