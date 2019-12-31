import React, { useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Blog from './Blog'
import CreateForm from './CreateForm'
import Togglable from './Togglable'

const BlogList = (props) => {
  const createFormRef = useRef(null)

  const toggle = () => createFormRef.current.toggleVisibility()

  return (
    <div className='bloglist-page'>
      <Togglable buttonLabel='create new' ref={createFormRef}>
        <CreateForm onSubmit={toggle}/>
      </Togglable>
      {props.blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

BlogList.defaultProps = {
  blogs: []
}

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }))
}

const mapStateToProps = ({ blogs }) => ({
  blogs: blogs.sort((a, b) => b.likes - a.likes)
})

export default connect(mapStateToProps)(BlogList)
