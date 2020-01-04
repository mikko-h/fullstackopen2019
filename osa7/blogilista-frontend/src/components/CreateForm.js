import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GenericField } from './Fields'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setNotification, TYPE_ERROR } from '../reducers/notificationReducer'

const CreateForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleCreate = async (values) => {
    try {
      await props.createBlog(values, props.token)
      props.setNotification(`A new blog ${values.title} by ${values.author} added`)
    } catch (exception) {
      props.setNotification('Failed to create a new blog', TYPE_ERROR)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleCreate({
      title: title.value,
      author: author.value,
      url: url.value
    })

    title.reset()
    author.reset()
    url.reset()
    props.onSubmit()
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <GenericField
          id="title"
          label="Title:"
          {...title}
        />
        <GenericField
          id="author"
          label="Author:"
          {...author}
        />
        <GenericField
          id="url"
          label="URL:"
          {...url}
        />
        <button data-cy="createsubmit" type="submit">create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  onSubmit: PropTypes.func,
  token: PropTypes.string.isRequired,
}

const mapStateToProps = ({ login: { token } }, { onSubmit }) => ({
  onSubmit,
  token
})

const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm)
