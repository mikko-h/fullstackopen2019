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

const Course = ({course}) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)
const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))