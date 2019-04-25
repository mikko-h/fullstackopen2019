const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv-flow').config()
}
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
  name: {
    minlength: 3,
    required: true,
    type: String,
    unique: true
  },
  number: {
    minlength: 8,
    required: true,
    type: String
  }
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
