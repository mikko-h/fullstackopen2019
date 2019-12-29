const sorted = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return sorted(action.data)
    case 'NEW_ANECDOTE':
      return sorted(state.concat(action.data))
    case 'VOTE':
      return sorted(state.map(anecdote => anecdote.id === action.data.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote))
    default:
      return state
  }
}

export const initAnecdotes = (anecdotes) => ({
  type: 'INIT_ANECDOTES',
  data: anecdotes
})

export const voteAnecdote = (id) => ({
  type: 'VOTE',
  data: { id }
})

export const createAnecdote = (anecdote) => ({
  type: 'NEW_ANECDOTE',
  data: anecdote
})

export default anecdoteReducer
