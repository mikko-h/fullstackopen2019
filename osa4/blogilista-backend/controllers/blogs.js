const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', '-blogs')
    if (blogs) {
      response.json(blogs)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      ...request.body,
      user
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const {
      title,
      author,
      url,
      likes
    } = request.body
    const blog = {
      title,
      author,
      url,
      likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      {
        context: 'query',
        new: true,
        runValidators: true
      }
    )
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user.id) {
      return response.status(403).json({ error: 'blog belongs to another user' })
    }

    await Blog.findByIdAndDelete(blog.id)
    user.blogs = user.blogs.filter(b => b.id !== blog.id)
    await user.save()
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
