describe('Blogs ', function () {
  const user = {
    username: 'testuser',
    password: 'testpass',
    name: 'Test User'
  }

  const testBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://example.com/testblog'
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

    it('list of users can be viewed', function () {
      const otherUser = {
        username: 'otheruser',
        password: 'otherpass',
        name: 'Other User'
      }

      cy.createUser(otherUser)

      cy.visit('/')
      cy.get('[data-cy=linkusers]')
        .click()
      cy.contains(otherUser.name)
    })

    describe('when there is a blog', function () {
      beforeEach(function () {
        cy.createBlog(testBlog)
        cy.visit('/')
        cy.contains(`${testBlog.title} ${testBlog.author}`)
          .click()
        cy.contains(`${testBlog.url}`)
      })

      it('it can be liked', function () {
        cy.contains('0 likes')
        cy.get('[data-cy=like]')
          .click()
        cy.contains('1 likes')
      })

      it('it can be commented', function () {
        const testComment = 'This is a test comment'
        cy.get('#comment')
          .type(testComment)
        cy.get('[data-cy=commentsubmit]')
          .click()
        cy.contains(testComment)
      })

      it('a blog can be removed', function ()  {
        cy.contains(`${testBlog.title} ${testBlog.author}`)
        cy.get('[data-cy=remove]')
          .click()
        cy.contains(`${testBlog.title} ${testBlog.author}`).should('not.exist')
      })
    })
  })
})
