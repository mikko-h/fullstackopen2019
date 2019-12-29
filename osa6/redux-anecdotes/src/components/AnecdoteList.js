import React from 'react'
import { connect } from 'react-redux'
import Filter from '../components/Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, filter, voteAnecdote, setNotification }) => {

  const vote = (id) => {
    voteAnecdote(id)
    setNotification(`You voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`)
  }

  return (
    <>
      <Filter />
      {anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
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

const mapStateToProps = ({ anecdotes, filter }) => ({
  anecdotes,
  filter
})

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
