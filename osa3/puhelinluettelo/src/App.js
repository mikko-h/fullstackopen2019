import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

const TYPE_ERROR = 'error'
const TYPE_SUCCESS = 'success'

const Notification = ({ message, type }) => {
  if (message) {
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  return null
}

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

const Person = ({name, number, handleRemove}) => (
  <div>{name} {number} <button onClick={handleRemove}>poista</button></div>
)

const Persons = ({persons, filter, handleRemove}) =>
  persons
    .filter(filter)
    .map(person => (<Person key={person.name} handleRemove={() => handleRemove(person.id)} {...person} />))

const App = () => {
  const [ notification, setNotification ] = useState(null)
  const [ persons, setPersons ] = useState([]) 
  const [ nameFilter, setNameFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const showNotification = (message, type = TYPE_SUCCESS) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  } 

  const handleChange = setState => event => setState(event.target.value)

  const handleRemove = (id) => {
    const personToRemove = persons.find(p => p.id === id)
    const confirmation = window.confirm(`Poistetaanko ${personToRemove.name}?`)

    if (confirmation) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Poistettiin ${personToRemove.name}`)
        })
    }
  }

  const personExists = person => persons.find(p => p.name === person.name)

  const personFilter = person => person.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1

  const addPerson = (event) => {
    const newPerson = { name: newName, number: newNumber }
    const existingPerson = personExists(newPerson)

    event.preventDefault()

    if (existingPerson) {
      const confirmation = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)
      
      if (confirmation) {
        personsService
          .update({
            ...existingPerson,
            number: newNumber
          })
          .then(person => {
            setPersons(persons.map(p => p.id === person.id ? person : p))
            setNewName('')
            setNewNumber('')
            showNotification(`Muutettiin henkilön ${person.name} numero`)
          })
          .catch(() => {
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setNewName('')
            setNewNumber('')
            showNotification(`${existingPerson.name} on jo poistettu`, TYPE_ERROR)
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setNewName('')
          setNewNumber('')
          showNotification(`Lisättiin ${person.name}`) 
        })
        .catch(err => {
          showNotification(err.response.data.error, TYPE_ERROR)
        })
    }
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Notification {...notification} />
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
      <Persons persons={persons} filter={personFilter} handleRemove={handleRemove} />
    </div>
  )

}

export default App