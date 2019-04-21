const mongoose = require('mongoose')
require('dotenv-flow').config()

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, {
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
  name: { type: String, required: true },
  number: { type: String, required: true }
})

personSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => {
    const { _id, ...rest } = ret
    return { ...rest }
  }
})

module.exports = mongoose.model('Person', personSchema)
