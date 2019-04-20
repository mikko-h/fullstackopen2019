const express = require('express')
const bodyParser = require('body-parser')
let persons = require('./db.json')

const app = express()
app.use(bodyParser.json())

const generateId = () => Math.round(Math.random() * 10000)

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === undefined) {
    return res.status(400).json({error: 'name missing'})
  } else if (body.number === undefined) {
    return res.status(400).json({error: 'number missing'})
  } else if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({error: 'name must be unique'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)
  res.json(person)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
