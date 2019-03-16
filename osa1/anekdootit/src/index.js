import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ anecdote, votes }) => (
  <div>
    {anecdote}
    <br/>
    has {votes} votes
  </div>
)

const Button = ({ handleClick, label }) => (
  <button onClick={handleClick}>{label}</button>
)
  
const App = (props) => {
  const [state, setState] = useState({
    selected: 0,
    votes: Array(anecdotes.length).fill(0)
  })

  const handleVote = () => {
    const newVotes = [...state.votes]
    newVotes[state.selected] += 1

    setState({
      ...state,
      votes: newVotes
    })
  }

  const selectRandom = () => setState({
    ...state,
    selected: Math.floor(Math.random() * anecdotes.length)
  })

  const largestVoteCount = state.votes.reduce((a, b) => Math.max(a, b))
  const mostVotesIndex = state.votes.findIndex(votes => votes === largestVoteCount)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[state.selected]} votes={state.votes[state.selected]} />
      <Button label="vote" handleClick={handleVote} />
      <Button label="next anecdote" handleClick={selectRandom} />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={props.anecdotes[mostVotesIndex]} votes={state.votes[mostVotesIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)