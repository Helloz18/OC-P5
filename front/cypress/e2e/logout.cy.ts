/// <reference types="cypress" />

describe('Logout ', () => {

    it('should not create session if the field date is not filled', () => {
        cy.visit('/login')

        //The post request to api/auth/login will return the body - simulation
    cy.intercept('POST', '/api/auth/login', {
        body: {
          token:"fake token",
          type: "Bearer",
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

        cy.contains('span', 'Logout').click();

        // assert
        cy.url().should('include', '');
        // and
        cy.visit('/sessions');
        cy.get('.mat-card-title').should('contain.text','Login');
    })
})