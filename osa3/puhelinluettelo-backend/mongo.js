const mongoose = require('mongoose')
const mongodbUri = require('mongodb-uri')

require('dotenv-flow').config()

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI puuttuu!')
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// Password is either part of MONGODB_URI variable or first command line argument
const parseParams = (argv) => {
  const args = argv.slice(2)
  const hasPassword = args.length === 1 || args.length === 3
  return hasPassword ? args : [undefined, ...args]
}

const getConnectionString = (url, password) => {
  if (password) {
    const urlObject = mongodbUri.parse(url)
    return mongodbUri.formatMongoose({
      ...urlObject,
      password
    })
  }

  return mongodbUri.formatMongoose(url)
}

const [password, ...params] = parseParams(process.argv)
const connectionString = getConnectionString(process.env.MONGODB_URI, password)

if (params.length === 2) {
  const [name, number] = params
  const person = new Person({
    name,
    number
  })

  mongoose.connect(connectionString, { useNewUrlParser: true })

  person
    .save()
    .then(({ name, number }) => {
      console.log(`lisätään henkilö ${name} numero ${number} luetteloon`)
      mongoose.connection.close()
    })

} else if (params.length === 0) {
  mongoose.connect(connectionString, { useNewUrlParser: true })

  Person
    .find({})
    .then(persons => {
      console.log('puhelinluettelo')
      persons.forEach(({ name, number }) => {
        console.log(`${name} ${number}`)
      })
      mongoose.connection.close()
    })
}
