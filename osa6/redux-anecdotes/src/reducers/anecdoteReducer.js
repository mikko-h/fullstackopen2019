import anecdoteService from '../services/anecdotes'

const sorted = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return sorted(action.data)
    case 'NEW_ANECDOTE':
      return sorted(state.concat(action.data))
    case 'VOTE':
      return sorted(state.map(anecdote => anecdote.id === action.data.id ? action.data : anecdote))
    default:
      return state
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export default anecdoteReducer
