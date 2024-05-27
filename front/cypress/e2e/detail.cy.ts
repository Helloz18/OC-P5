/// <reference types="cypress" />

describe('detail spec', () => {
  it('should show the details of a session - admin case', () => {
    cy.visit('/sessions/detail/1');

    //The post request to api/auth/login will return the body
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true,
      },
    });

    //The get request to api/session will return a list of sessions
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
          users: [2],
          createdAt: '2024-05-21T09:04:24',
          updatedAt: '2024-05-21T09:04:24',
        },
      ]
    ).as('session');

    //The get request to api/teacher/id will return the teacher
    cy.intercept(
      {
        method: 'GET',
        url: '/api/teacher/1',
      },
      {
        id: 1,
        lastName: 'DELAHAYE',
        firstName: 'Margot',
        createdAt: '2024-05-17T11:03:05',
        updatedAt: '2024-05-17T11:03:05',
      }
    ).as('teacher');

    //The get request to api/session/id will return a session
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
        users: [2],
        createdAt: '2024-05-21T09:04:24',
        updatedAt: '2024-05-21T09:04:24',
      }
    ).as('session/1');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    cy.contains('Detail').click();

    // assert
    cy.contains('button', 'Delete').should('be.visible');
    cy.get('h1').should('contain.text', 'Session Test');
    cy.get('.description').should('contain.text', 'test');
    cy.contains('button', 'Participate').should('not.exist');
    cy.contains('button', 'Do not participate').should('not.exist');
  });

  it('should show the details of a session - user case', () => {
    cy.visit('/sessions/detail/1');

    //The post request to api/auth/login will return the body
    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 2,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: false,
      },
    });

    //The get request to api/session will return a list of sessions
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
          users: [2],
          createdAt: '2024-05-21T09:04:24',
          updatedAt: '2024-05-21T09:04:24',
        },
      ]
    ).as('session');

    //The get request to api/teacher/id will return the teacher
    cy.intercept(
      {
        method: 'GET',
        url: '/api/teacher/1',
      },
      {
        id: 1,
        lastName: 'DELAHAYE',
        firstName: 'Margot',
        createdAt: '2024-05-17T11:03:05',
        updatedAt: '2024-05-17T11:03:05',
      }
    ).as('teacher');

    //The get request to api/session/id will return a session
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
        users: [2],
        createdAt: '2024-05-21T09:04:24',
        updatedAt: '2024-05-21T09:04:24',
      }
    ).as('session/1');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type(
      `${'test!1234'}{enter}{enter}`
    );

    cy.contains('Detail').click();

    // assert
    cy.contains('button', 'Delete').should('not.exist');
    cy.get('h1').should('contain.text', 'Session Test');
    cy.get('.description').should('contain.text', 'test');
    // user is participating to this session
    cy.contains('button', 'Participate').should('not.exist');
    cy.contains('button', 'Do not participate').should('be.visible');
  });
});
