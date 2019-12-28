import React from 'react'
import PropTypes from 'prop-types'
import { GenericField } from './Fields'
import { useField } from '../hooks'

const CreateForm = ({
  handleCreate
}) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default CreateForm
