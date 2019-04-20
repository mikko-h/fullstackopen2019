const express = require('express')
const persons = require('./db.json')

const app = express()

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`<p>puhelinluettelossa ${persons.length} henkilön tiedot</p><p>${Date()}</p>`)
})  

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
