import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

const Content = ({parts}) => (
  <>
    {parts.map(part => (<Part key={part.name} {...part} />))}
  </>
)

const Total = ({parts}) => {
  const count = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>yhteensä {count} tehtävää</p>
  )
}

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const parts = [
    {
      name: 'Reactin perusteet',
      exercises: 10
    },
    {
      name: 'Tiedonvälitys propseilla',
      exercises: 7
    },
    {
      name: 'Komponenttien tila',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))