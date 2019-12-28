import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  const { anecdotes, filter } = store.getState()

  const vote = (id) => {
    store.dispatch(voteAnecdote(id))
    store.dispatch(setNotification(`You voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
  }

  return (
    <>
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

export default AnecdoteList
