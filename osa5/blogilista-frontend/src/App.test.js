import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
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

  test('if user is logged in, notes are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    window.localStorage.setItem('loggedInUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('blogs')
    )

    expect(component.container.querySelector('.login-page')).toBeNull()
    expect(component.container.querySelector('.bloglist-page')).toBeInTheDocument()
  })
})
