const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv-flow').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true
})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => {
    const { _id, ...rest } = ret
    return { ...rest }
  }
})

module.exports = mongoose.model('Person', personSchema)
