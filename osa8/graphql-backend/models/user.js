const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    minlength: 3,
    type: String,
    required: true,
    unique: true
  },
  favoriteGenre: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', userSchema)
