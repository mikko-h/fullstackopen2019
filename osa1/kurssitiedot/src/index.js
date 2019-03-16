import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

const Content = ({ 
  part1,
  part2,
  part3
}) => (
  <>
    <Part {...part1} />
    <Part {...part2} />
    <Part {...part3} />
  </>
)

const Total = ({ part1, part2, part3 }) => (
  <p>yhteensä {part1.exercises + part2.exercises + part3.exercises} tehtävää</p>
)

const App = () => {
  const course = 'Half Stack -sovelluskehitys'
  const part1 = {
    name: 'Reactin perusteet',
    exercises: 10
  }
  const part2 = {
    name: 'Tiedonvälitys propseilla',
    exercises: 7
  }
  const part3 = {
    name: 'Komponenttien tila',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total
        part1={part1}
        part2={part2}
        part3={part3}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))