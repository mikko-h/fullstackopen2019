import React, { useState } from 'react'

const UpdateAuthor = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    await props.editAuthor({
      variables: { name, born: parseInt(born, 10) }
    })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Set birthyear</h3>
        <div>
          name
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="">- select -</option>
            {props.allAuthors.map(author =>
              <option key={author.id} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
