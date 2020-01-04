describe('Blogs ', function() {
  it('user can login', function () {
    cy.visit('/')
    cy.contains('Log in to application')
    cy.get('[data-cy=username]')
      .type('testuser')
    cy.get('[data-cy=password]')
      .type('testpass')
    cy.get('[data-cy=login]')
      .click()
    cy.contains('Test User logged in')
  })

  it('user can logout', function () {
    cy.request('POST', '/api/login', { username: 'testuser', password: 'testpass' })
      .then((response) => {
        expect(response.body).to.have.property('token')
        window.localStorage.setItem('state', JSON.stringify({ login: response.body }))
      })
    cy.visit('/')
    cy.contains('Test User logged in')
    cy.get('[data-cy=logout]')
      .click()
    cy.contains('Log in to application')
  })
})
