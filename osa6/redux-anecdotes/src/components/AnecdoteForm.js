import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`You added '${content}'`, 5)
  }

  return (
    <form onSubmit={create}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
