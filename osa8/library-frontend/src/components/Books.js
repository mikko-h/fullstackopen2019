import React, { useState } from 'react'
import Booklist from './Booklist'

const Books = ({ books, show }) => {
  const [filter, setFilter] = useState(null)

  if (!show || books.loading) {
    return null
  }

  const allGenres = Array.from(new Set(books.data.allBooks.reduce((acc, book) => acc.concat(book.genres), [])))

  return (
    <div>
      <h2>books</h2>
      <Booklist
        books={books.data.allBooks}
        filter={filter}
      />
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
