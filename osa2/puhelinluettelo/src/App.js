import React, { useState } from 'react'

const Person = ({name, number}) => (
  <div>{name} {number}</div>
)

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]) 
  const [ nameFilter, setNameFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleFilterChange = event => setNameFilter(event.target.value)

  const handleNameChange = event => setNewName(event.target.value)

  const handleNumberChange = event => setNewNumber(event.target.value)

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

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <div>
        rajaa näytettäviä <input onChange={handleFilterChange} />
      </div>
      <h2>Lisää uusi</h2>
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
      {persons
        .filter(personFilter)
        .map(person => (<Person key={person.name} {...person} />))}
    </div>
  )

}

export default App