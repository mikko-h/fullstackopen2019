import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Part = ({ title, exercises }) => (
  <p>{title} {exercises}</p>
)

const Content = ({ 
  exercises1,
  exercises2,
  exercises3,
  part1,
  part2,
  part3
}) => (
  <>
    <Part title={part1} exercises={exercises1} />
    <Part title={part2} exercises={exercises2} />
    <Part title={part3} exercises={exercises3} />
  </>
)

const Total = ({ exercises1, exercises2, exercises3 }) => (
  <p>yhteensä {exercises1 + exercises2 + exercises3} tehtävää</p>
)

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = 'Reactin perusteet'
  const exercises1 = 10
  const part2 = 'Tiedonvälitys propseilla'
  const exercises2 = 7
  const part3 = 'Komponenttien tila'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1} exercises1={exercises1}
        part2={part2} exercises2={exercises2}
        part3={part3} exercises3={exercises3}
      />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))