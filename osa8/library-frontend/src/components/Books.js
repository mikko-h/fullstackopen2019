import React, { useState } from 'react'

const Books = ({ books, show }) => {
  const [filter, setFilter] = useState(null)

  if (!show || books.loading) {
    return null
  }

  const allGenres = Array.from(new Set(books.data.allBooks.reduce((acc, book) => acc.concat(book.genres), [])))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks
            .filter(a => filter ? a.genres.includes(filter) : true)
            .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {allGenres.map(genre =>
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        )}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
