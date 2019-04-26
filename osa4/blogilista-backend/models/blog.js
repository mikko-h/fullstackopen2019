const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    const { _id, ...rest } = ret
    return { ...rest }
  }
})

module.exports = mongoose.model('Blog', blogSchema)
