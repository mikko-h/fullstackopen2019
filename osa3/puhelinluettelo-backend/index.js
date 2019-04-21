const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

let persons = require('./db.json')

morgan.token('content', (req, res) => JSON.stringify(req.body))

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use(morgan(':method :url :content :status :res[content-length] - :response-time ms'))

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => res.json(persons.map(person => person.toJSON())))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({error: 'name missing'})
  } else if (body.number === undefined) {
    return res.status(400).json({error: 'number missing'})
  // } else if (persons.some(p => p.name === body.name)) {
  //   return res.status(400).json({error: 'name must be unique'})
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => res.json(savedPerson.toJSON()))
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(204).end()
})

app.get('/info', (req, res) => {
  res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${Date()}</p>`)
})  

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
