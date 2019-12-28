import React from 'react';
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = ({ store }) => (
  <div>
    <h2>Anecdotes</h2>
    <Notification store={store} />
    <AnecdoteForm store={store} />
    <AnecdoteList store={store} />
  </div>
)

export default App
