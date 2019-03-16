import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ label, handleClick }) => (
  <button onClick={handleClick}>{label}</button>
)

const Statistic = ({ text, value }) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good - bad) / total || 0
  const positive = (good / total || 0) * 100

  if (total === 0) {
    return (
      <p>Ei yhtään palautetta annettu</p>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text="hyvä" value={good} />
        <Statistic text="neutraali" value={neutral} />
        <Statistic text="huono" value={bad} />
        <Statistic text="yhteensä" value={total} />
        <Statistic text="keskiarvo" value={average} />
        <Statistic text="positiivisia" value={positive + ' %'} />
      </tbody>
    </table>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)