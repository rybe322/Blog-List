describe('Note app', () => {

  it('front page can be opened', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
  })
  it('An unsuccessful login attempt', () => {
    cy.visit('http://localhost:3000')
    cy.contains('login').click()
    cy.get('#username').type('Bad')
    cy.get('#password').type('Password')
    cy.get('#login-button').click()
    cy.contains('Bad')
  })
  describe('when logged in', () => {
    it('login form can be opened', () => {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('User')
      cy.get('#password').type('Test123')
      cy.get('#login-button').click()
      cy.contains('Name')
      cy.contains('Username')
    })

    

    it('a new note can be created', () => {
      cy.get('#createBlog').click()
      cy.get('#titleInput').type('Test title from cyprus')
      cy.get('#authorInput').type('Test author from cyprus')
      cy.get('#urlInput').type('cyprus.com')
      cy.get('#likesInput').type(100)
      cy.get('#submit-blog-button').click()
      cy.contains('Added')
      
    })
  })
    /*
    cy.get('titleInput').type('Test from cypress Title')
    cy.get('authorInput').type('Test from cypress Author')
    cy.get('urlInput').type('Test from cypress URL')
    cy.get('titleInput').type(100)
    cy.get('submit-blog-button').click()

  })
  */


})