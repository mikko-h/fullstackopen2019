const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  name: String,
  passwordHash: { type: String, required: true }
})

userSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, ret) => {
    const { _id, passwordHash, ...rest } = ret
    return { ...rest }
  }
})

module.exports = mongoose.model('User', userSchema)
