import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Log in')
    )

    expect(component.container.querySelector('.login-page')).toBeInTheDocument()
    expect(component.container.querySelector('.bloglist-page')).toBeNull()
  })
})
