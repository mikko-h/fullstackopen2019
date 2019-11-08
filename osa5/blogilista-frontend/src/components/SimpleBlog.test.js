import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    likes: 3
  }

  test('renders a blog', () => {
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

  test('like is pressed twice', ()  => {
    const mockHandler = jest.fn()
    const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
