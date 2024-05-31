/// <reference types="cypress" />

describe('Login with real backend', () => {
    it.only('should log in with valid credentials', () => {
      
        cy.visit('/login')
        cy.get('input[formControlName=email]').type("yoga@studio.com")
        cy.get('input[formControlName=password]').type("test!1234")
        
        cy.get('form').submit()
    
        cy.url().should('include', '/sessions')
    })

})