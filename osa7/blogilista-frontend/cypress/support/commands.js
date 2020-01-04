// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', '/api/login', { username, password })
    .then((response) => {
      expect(response.body).to.have.property('token')
      window.localStorage.setItem('state', JSON.stringify({ login: response.body }))
    })
})

Cypress.Commands.add('resetDb', () => {
  cy.request('POST', '/api/testing/reset')
    .then((response) => {
      expect(response.status).to.equal(204)
    })
})

Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', '/api/users', user)
    .then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body.username).to.equal(user.username)
    })
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
