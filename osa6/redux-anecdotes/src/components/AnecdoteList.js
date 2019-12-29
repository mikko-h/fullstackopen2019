import React from 'react'
import { connect } from 'react-redux'
import Filter from '../components/Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ visibleAnecdotes, voteAnecdote, setNotification }) => {

  const vote = (id) => {
    voteAnecdote(id)
    setNotification(`You voted '${visibleAnecdotes.find(anecdote => anecdote.id === id).content}'`)
  }

  return (
    <>
      <Filter />
      {visibleAnecdotes
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => anecdotes.filter(anecdote => anecdote.content.includes(filter))

const mapStateToProps = (state) => ({
  visibleAnecdotes: anecdotesToShow(state)
})

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
