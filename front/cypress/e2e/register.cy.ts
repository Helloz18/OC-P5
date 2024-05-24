/// <reference types="cypress" />

describe('Register spec', () => {
  it('Register successfull', () => {
    cy.visit('/register');

    // nothing is returned when successfully register, just navigate to login page
    cy.intercept('POST', '/api/auth/register', {});

    // enter values for the form fields
    cy.get('input[formControlName=email]').type('test2@studio.com');
    cy.get('input[formControlName=firstName]').type('firstName');
    cy.get('input[formControlName=lastName]').type('lastName');
    cy.get('input[formControlName=password]').type(
      `${'password'}{enter}{enter}`
    );

    // assert that we are redirected to the login page
    cy.url().should('include', '/login');
  });

  it('Register without a field, submit is disabled.', () => {
    cy.visit('/register');

    // enter values for the form fields but don't fill the email
    cy.get('input[formControlName=firstName]').type('firstName');
    cy.get('input[formControlName=lastName]').type('lastName');
    cy.get('input[formControlName=password]').type('password');

    // try to click on submit button
    cy.contains('Submit').should('be.disabled');
    cy.url().should('include', '/register');
  });

  it('Register with empty fields, an error is displayed.', () => {
    cy.visit('/register');

    // enter values for the form fields but don't fill firstName and lastName
    cy.get('input[formControlName=email]').type('test2@studio.com');
    cy.get('input[formControlName=firstName]').type(' ');
    cy.get('input[formControlName=lastName]').type(' ');
    cy.get('input[formControlName=password]').type(
      `${'password'}{enter}{enter}`
    );

    // assert
    cy.get('.error').should('contain.text', 'An error occurred');
    cy.url().should('include', '/register');
  });
});
