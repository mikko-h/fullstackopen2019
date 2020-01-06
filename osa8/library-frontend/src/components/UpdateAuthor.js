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
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
