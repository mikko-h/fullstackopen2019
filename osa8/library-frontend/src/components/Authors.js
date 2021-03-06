import React from 'react'
import UpdateAuthor from './UpdateAuthor'

const Authors = ({ authors, editAuthor, show }) => {
  if (!show || authors.loading) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <UpdateAuthor allAuthors={authors.data.allAuthors} editAuthor={editAuthor} />
    </div>
  )
}

export default Authors
