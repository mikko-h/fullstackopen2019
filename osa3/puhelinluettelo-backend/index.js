const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')

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

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  const person = new Person({
    name,
    number
  })

  person
    .save()
    .then(savedPerson => res.json(savedPerson.toJSON()))
    .catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => res.json(person.toJSON()))
    .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const person = {
    name,
    number
  }

  Person
    .findByIdAndUpdate(
      req.params.id, 
      person, 
      {
        context: 'query',
        new: true,
        runValidators: true
      })
    .then(updatedPerson => res.json(updatedPerson.toJSON()))
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => next(err))
})

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(persons => res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${Date()}</p>`))
})

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError' && err.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  if (err.name === 'TypeError') {
    return res.status(404).end()
  }

  if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}
app.use(errorHandler)

const unknownEndpoint = (req, res) => res.status(404).send({ error: 'unknown endpoint' })
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
