import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation, useQuery } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {
        name
      },
      published,
      genres
    }
  }
`

const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, setBornTo: $born) {
    name
    born
  }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const [login] = useMutation(LOGIN)

  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={logout}>logout</button>
            </>

          :
            <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        authors={authors}
        editAuthor={editAuthor}
        show={page === 'authors'}
      />

      <Books
        books={books}
        show={page === 'books'}
      />

      <Login
        login={login}
        setToken={setToken}
        show={page === 'login'}
      />

      <NewBook
        addBook={addBook}
        show={page === 'add'}
      />

    </div>
  )
}

export default App
