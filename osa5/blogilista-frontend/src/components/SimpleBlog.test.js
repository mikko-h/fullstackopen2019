import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders a blog', () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    likes: 3
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container.querySelector('.title-author')).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  expect(component.container.querySelector('.likes')).toHaveTextContent(
    `blog has ${blog.likes} likes`
  )
})
