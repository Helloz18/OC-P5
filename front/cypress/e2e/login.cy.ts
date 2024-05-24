/// <reference types="cypress" />

describe('Login spec', () => {
  it('Login successfull', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')
  })

  it('login with wrong email', ()=> {
    cy.visit('/login')
    cy.get('input[formControlName=email]').type("error@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    cy.get('.error').should('contain.text', 'An error occurred')

    cy.url().should('include', '/login')
  })

  it('login with wrong password', ()=> {
    cy.visit('/login')
    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test"}{enter}{enter}`)
    cy.get('.error').should('contain.text', 'An error occurred')

    cy.url().should('include', '/login')
  })

  it('login without email', ()=> {
    cy.visit('/login')
    cy.get('input[formControlName=password]').type(`${"test"}{enter}{enter}`)
    cy.get('.error').should('contain.text', 'An error occurred')

    cy.url().should('include', '/login')
  })

  it('login without password', ()=> {
    cy.visit('/login')
    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`{enter}{enter}`)
    cy.get('.error').should('contain.text', 'An error occurred')

    cy.url().should('include', '/login')
  })

});
