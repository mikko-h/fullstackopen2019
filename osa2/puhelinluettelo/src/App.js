import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleChange}) => (
  <div>
    rajaa näytettäviä <input onChange={handleChange} />
  </div>
)

const PersonForm = ({
  handleNameChange,
  handleNumberChange,
  handleSubmit,
  newName,
  newNumber
}) => (
  <form onSubmit={handleSubmit}>
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
)

const Person = ({name, number}) => (
  <div>{name} {number}</div>
)

const Persons = ({persons, filter}) =>
  persons
    .filter(filter)
    .map(person => (<Person key={person.name} {...person} />))

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ nameFilter, setNameFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleChange = setState => event => setState(event.target.value)

  const personExists = person => persons.findIndex(p => p.name === person.name) > -1

  const personFilter = person => person.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1

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

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter handleChange={handleChange(setNameFilter)} />
      <h2>Lisää uusi</h2>
      <PersonForm
        handleNameChange={handleChange(setNewName)}
        handleNumberChange={handleChange(setNewNumber)}
        handleSubmit={addPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numerot</h2>
      <Persons persons={persons} filter={personFilter} />
    </div>
  )

}

export default App