import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'

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

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    genres
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const USERINFO = gql`
  query {
    me {
      username
      favoriteGenre
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
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
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

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const userinfo = useQuery(USERINFO)
  const [addBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const [login] = useMutation(LOGIN, {
    refetchQueries: [{ query: USERINFO }]
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData: { data: { bookAdded: { title, author: { name }}}}}) => {
      window.alert(`Added book ${title} by ${name}`)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
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

      <Recommend
        books={books}
        show={page === 'recommend'}
        userinfo={userinfo}
      />

    </div>
  )
}

export default App
