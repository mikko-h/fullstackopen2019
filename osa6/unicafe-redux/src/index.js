import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatch = (type) => () => store.dispatch({ type })
  const { good, ok, bad } = store.getState();

  return (
    <div>
      <button onClick={dispatch('GOOD')}>hyvä</button>
      <button onClick={dispatch('OK')}>neutraali</button>
      <button onClick={dispatch('BAD')}>huono</button>
      <button onClick={dispatch('ZERO')}>nollaa tilastot</button>
      <div>hyvä {good}</div>
      <div>neutraali {ok}</div>
      <div>huono {bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
