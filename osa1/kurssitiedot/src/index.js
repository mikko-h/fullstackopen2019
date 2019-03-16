import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => (
  <h1>{name}</h1>
)

const Part = ({name, exercises}) => (
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
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
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
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))