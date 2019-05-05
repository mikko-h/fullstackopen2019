import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField } from './Fields'

const CreateForm = ({
  handleCreate
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleCreate({ title, author, url})

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          id="title"
          label="Title:"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          id="author"
          label="Author:"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          id="url"
          label="URL:"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
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
