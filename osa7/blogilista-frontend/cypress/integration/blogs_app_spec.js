describe('Blogs ', function () {
  const user = {
    username: 'testuser',
    password: 'testpass',
    name: 'Test User'
  }

  beforeEach(function () {
    cy.resetDb()
    cy.createUser(user)
  })

  it('user can login', function () {
    cy.visit('/')
    cy.contains('Log in to application')
    cy.get('[data-cy=username]')
      .type('testuser')
    cy.get('[data-cy=password]')
      .type('testpass')
    cy.get('[data-cy=login]')
      .click()
    cy.contains(`${user.name} logged in`)
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login(user.username, user.password)
    })

    it('user can logout', function () {
      cy.visit('/')
      cy.contains(`${user.name} logged in`)
      cy.get('[data-cy=logout]')
        .click()
      cy.contains('Log in to application')
    })

    it('a new blog can be created', function () {
      const testBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://example.com/testblog'
      }
      cy.visit('/')
      cy.get('[data-cy=toggleform]')
        .click()
      cy.get('#title')
        .type(testBlog.title)
      cy.get('#author')
        .type(testBlog.author)
      cy.get('#url')
        .type(testBlog.url)
      cy.get('[data-cy=createsubmit]')
        .click()
      cy.contains(`${testBlog.title} ${testBlog.author}`)
    })
  })
})
