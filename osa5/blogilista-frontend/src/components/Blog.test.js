import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('<Blog />', () => {
  const mockLike = jest.fn()
  const mockRemove = jest.fn()
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    likes: 3,
    url: 'http://example.com/',
    user: {
      name: 'Blog User'
    }
  }

  test('renders only title and author by default', () => {
    const component = render(
      <Blog blog={blog} removable={false} onLikeClick={mockLike} onRemoveClick={mockRemove} />
    )

    expect(component.container.querySelector('.blog-title')).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )

    expect(component.container.querySelector('.blog-details')).toBeNull()
  })

  test('renders details when clicked', () => {
    const component = render(
      <Blog blog={blog} removable={false} onLikeClick={mockLike} onRemoveClick={mockRemove} />
    )
    const title = component.container.querySelector('.blog-title')

    expect(component.container.querySelector('.blog-details')).toBeNull()

    fireEvent.click(title)

    expect(component.container.querySelector('.blog-details')).toBeInTheDocument()
    expect(component.container.querySelector('.blog-details')).toHaveTextContent(
      `${blog.likes} likes`
    )
    expect(component.container.querySelector('.blog-details')).toHaveTextContent(
      `added by ${blog.user.name}`
    )
  })
})
