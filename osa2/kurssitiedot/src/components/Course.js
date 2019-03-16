import React from 'react'

const Header = ({name}) => (
    <h1>{name}</h1>
  )
  
  const Part = ({name, exercises}) => (
    <p>{name} {exercises}</p>
  )
  
  const Content = ({parts}) => (
    <>
      {parts.map(part => (<Part key={part.id} {...part} />))}
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
  
  export default Course