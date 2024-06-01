/// <reference types="cypress" />

describe('Update Session spec', () => {
  it('should update session if a field is changed', () => {
    cy.visit('/sessions/update/1');

    //The post request to api/auth/login will return the body - simulation
    cy.intercept('POST', '/api/auth/login', {
      body: {
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b2dhQHN0dWRpby5jb20iLCJpYXQiOjE3MTcxNDY2MzUsImV4cCI6MTcxNzIzMzAzNX0.zmXp5Bxz5Ehs_WggZEOGjg40o0zFGx90Rpbw1ErnBpfWDoVfS_DZewZ0ICfhJB-5oAVxglqd9RxshWkK5qhAfh',
        type: 'Bearer',
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true,
      },
    });

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      [
        {
          id: 1,
          name: 'session test',
          date: '2024-05-21T07:04:24.000+00:00',
          teacher_id: 1,
          description: 'test',
          users: [],
          createdAt: '2024-05-21T09:04:24',
          updatedAt: '2024-05-27T09:42:21',
        },
      ]
    ).as('session');

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session/1',
      },
      {
        id: 1,
        name: 'session test',
        date: '2024-05-21T07:04:24.000+00:00',
        teacher_id: 1,
        description: 'test',
        users: [],
        createdAt: '2024-05-21T09:04:24',
        updatedAt: '2024-05-27T09:42:21',
      }
    );

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    cy.intercept(
      {
        method: 'GET',
        url: 'api/teacher',
      },
      [
        {
          id: 1,
          lastName: 'DELAHAYE',
          firstName: 'Margot',
          createdAt: '2024-05-17T11:03:05',
          updatedAt: '2024-05-17T11:03:05',
        },
        {
          id: 2,
          lastName: 'THIERCELIN',
          firstName: 'Hélène',
          createdAt: '2024-05-17T11:03:05',
          updatedAt: '2024-05-17T11:03:05',
        },
      ]
    );

    // click on edit session, to enter the update session page
    cy.contains('button', 'Edit').click();

    cy.get('input[formControlName=name]').type(' changed');

    cy.intercept(
      {
        method: 'PUT',
        url: '/api/session/1',
      },
      [
        {
          id: 1,
          name: 'session test changed',
          description: 'new description of a session.',
          teacher_id: 1,
          date: new Date(),
          users: [],
        },
      ]
    );
    // click the save button
    cy.get('button[type="submit"]').click();

    // assert
    cy.get('.mat-simple-snack-bar-content').should(
      'have.text',
      'Session updated !'
    );
    cy.url().should('equal', 'http://localhost:4200/sessions');
  });

  it('should not update session if a field is empty', () => {
    cy.visit('/sessions/update/1');

    //The post request to api/auth/login will return the body - simulation
    cy.intercept('POST', '/api/auth/login', {
      body: {
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b2dhQHN0dWRpby5jb20iLCJpYXQiOjE3MTcxNDY2MzUsImV4cCI6MTcxNzIzMzAzNX0.zmXp5Bxz5Ehs_WggZEOGjg40o0zFGx90Rpbw1ErnBpfWDoVfS_DZewZ0ICfhJB-5oAVxglqd9RxshWkK5qhAfh',
        type: 'Bearer',
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true,
      },
    });

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      [
        {
          id: 1,
          name: 'session test',
          date: '2024-05-21T07:04:24.000+00:00',
          teacher_id: 1,
          description: 'test',
          users: [],
          createdAt: '2024-05-21T09:04:24',
          updatedAt: '2024-05-27T09:42:21',
        },
      ]
    ).as('session');

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session/1',
      },
      {
        id: 1,
        name: 'session test',
        date: '2024-05-21T07:04:24.000+00:00',
        teacher_id: 1,
        description: 'test',
        users: [],
        createdAt: '2024-05-21T09:04:24',
        updatedAt: '2024-05-27T09:42:21',
      }
    );

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    cy.intercept(
      {
        method: 'GET',
        url: 'api/teacher',
      },
      [
        {
          id: 1,
          lastName: 'DELAHAYE',
          firstName: 'Margot',
          createdAt: '2024-05-17T11:03:05',
          updatedAt: '2024-05-17T11:03:05',
        },
        {
          id: 2,
          lastName: 'THIERCELIN',
          firstName: 'Hélène',
          createdAt: '2024-05-17T11:03:05',
          updatedAt: '2024-05-17T11:03:05',
        },
      ]
    );

    // click on edit session, to enter the update session page
    cy.contains('button', 'Edit').click();

    cy.get('input[formControlName=name]').clear();

    // assert
    cy.contains('Save').should('be.disabled');
  });
});
