import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GenericField } from './Fields'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification, TYPE_ERROR } from '../reducers/notificationReducer'

const CommentForm = (props) => {
  const comment = useField('text')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await props.commentBlog(props.blog, comment.value)
    } catch (exception) {
      props.setNotification('Failed to comment a blog', TYPE_ERROR)
    }
    comment.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <GenericField
        id="comment"
        label="Comment:"
        {...comment}
      />
      <button type="submit">add comment</button>
    </form>
  )
}

CommentForm.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  commentBlog: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  commentBlog,
  setNotification
}

export default connect(null, mapDispatchToProps)(CommentForm)
