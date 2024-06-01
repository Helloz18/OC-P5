/// <reference types="cypress" />

describe('Not found spec', () => {
  it('should show not found page if user visit page that does not exist', () => {
    cy.visit('/unknown');

    // assert
    cy.url().should('include', '404');
    cy.get('h1').should('have.text', 'Page not found !');
  });
});
