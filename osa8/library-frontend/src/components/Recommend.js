import React from 'react'
import Booklist from './Booklist'

const Recommend = ({ books, show, userinfo }) => {
  if (!show || books.loading) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {userinfo.data.me.favoriteGenre}</p>
      <Booklist
        books={books.data.allBooks}
        filter={userinfo.data.me.favoriteGenre}
      />
    </div>
  )
}

export default Recommend
