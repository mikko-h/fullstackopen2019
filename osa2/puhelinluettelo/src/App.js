import React, { useState } from 'react'

const Person = ({name, number}) => (
  <div>{name} {number}</div>
)

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

  const personExists = person => persons.findIndex(p => p.name === person.name) > -1

  const addPerson = (event) => {
    const newPerson = { name: newName, number: newNumber }

    event.preventDefault()

    if (personExists(newPerson)) {
      window.alert(`${newName} on jo luettelossa`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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
          numero: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {persons.map(person => (<Person key={person.name} {...person} />))}
    </div>
  )

}

export default App