const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    minlength: 3,
    type: String,
    required: true,
    unique: true
  },
  name: String,
  passwordHash: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => {
    const { _id, passwordHash, ...rest } = ret
    return { ...rest }
  }
})

module.exports = mongoose.model('User', userSchema)
