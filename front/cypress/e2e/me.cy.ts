/// <reference types="cypress" />

describe('account tests', () => {
  it('should display the information of the connected Admin', () => {
    cy.visit('/me');

    // Mock the login method with an admin user
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'yoga@studio.com',
        firstName: 'Admin',
        lastName: 'YogaAdmin',
        admin: true,
      },
    });
    // Mock the session list
    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []
    ).as('session');

    // Mock the return of get /api/user/1
    cy.intercept(
      {
        method: 'GET',
        url: '/api/user/1',
      },
      {
        id: 1,
        email: 'yoga@studio.com',
        lastName: 'YogaAdmin',
        firstName: 'Admin',
        admin: true,
        createdAt: '2024-05-17T11:03:05',
        updatedAt: '2024-05-17T11:03:05',
      }
    );

    // fill the login form and submit
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    // go to the /me page by clicking on span account
    cy.contains('span', 'Account').click();

    // Assert
    cy.get('h1').should('contain.text', 'User information');
    cy.get('.mat-card-content > div.ng-star-inserted > :nth-child(1)').should(
      'contain.text',
      'Name: Admin YOGAADMIN'
    );
    cy.get('.mat-card-content > div.ng-star-inserted > :nth-child(2)').should(
      'contain.text',
      'Email: yoga@studio.com'
    );
    cy.get('.my2').should('contain.text', 'You are admin');
    cy.contains('mat-icon', 'delete').should('not.exist');
  });

  it('should display the information of the connected user', () => {
    cy.visit('/me');

    // Mock the login method with an admin user
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 2,
        username: 'user@studio.com',
        firstName: 'User',
        lastName: 'NotAdmin',
        admin: false,
      },
    });
    // Mock the session list
    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []
    ).as('session');

    // Mock the return of get /api/user/1
    cy.intercept(
      {
        method: 'GET',
        url: '/api/user/2',
      },
      {
        id: 2,
        email: 'user@studio.com',
        lastName: 'NotAdmin',
        firstName: 'User',
        admin: false,
        createdAt: '2024-05-17T11:03:05',
        updatedAt: '2024-05-17T11:03:05',
      }
    );

    // fill the login form and submit
    cy.get('input[formControlName=email]').type('user@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    // go to the /me page by clicking on span account
    cy.contains('span', 'Account').click();

    // Assert
    cy.get('h1').should('contain.text', 'User information');
    cy.get('.mat-card-content > div.ng-star-inserted > :nth-child(1)').should(
      'contain.text',
      'Name: User NOTADMIN'
    );
    cy.get('.mat-card-content > div.ng-star-inserted > :nth-child(2)').should(
      'contain.text',
      'Email: user@studio.com'
    );
    cy.get('.my2').should('not.contain.text', 'You are admin');
    cy.get('.my2 > p').should('contain.text', 'Delete my account:');
    cy.contains('mat-icon', 'delete').should('be.visible');
  });
});
