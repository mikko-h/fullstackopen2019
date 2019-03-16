import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>anna palautetta</h1>
      <Button handleClick={() => setGood(good + 1)} label="hyvä" />
      <Button handleClick={() => setNeutral(neutral + 1)} label="neutraali" />
      <Button handleClick={() => setBad(bad + 1)} label="huono" />
      <h1>statistiikka</h1>
      <p>hyvä {good}</p>
      <p>neutraali {neutral}</p>
      <p>huono {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)