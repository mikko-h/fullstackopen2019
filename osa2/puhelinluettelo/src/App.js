import React, { useState } from 'react'

const Person = ({name}) => (
  <div>{name}</div>
)

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = event => setNewName(event.target.value)

  const personExists = person => persons.findIndex(p => p.name === person.name) > -1

  const addPerson = (event) => {
    const newPerson = { name: newName }
    event.preventDefault()
    if (personExists(newPerson)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')  
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {persons.map(person => (<Person key={person.name} name={person.name} />))}
    </div>
  )

}

export default App