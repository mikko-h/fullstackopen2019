const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    const { _id, ...rest } = ret
    return { ...rest }
  }
})

module.exports = mongoose.model('Blog', blogSchema)
