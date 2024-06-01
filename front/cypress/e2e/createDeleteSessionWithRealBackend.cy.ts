/// <reference types="cypress" />

describe('Create Session with Real Backend', () => {
  let token;
  let teachers;
  let numberOfSessionsStart;
  before(() => {
    // call to the backend
    cy.request('POST', `${Cypress.env('apiUrl')}/api/auth/login`, {
      email: 'yoga@studio.com',
      password: 'test!1234',
    }).then((response) => {
      this.token = response.body.token;

      const authorization = `Bearer ${this.token}`;

      const getSessions = {
        method: 'GET',

        url: `${Cypress.env('apiUrl')}/api/session`,
        headers: {
          authorization,
          'Content-Type': 'application/json',
        },
      };

      cy.request(getSessions).then((response) => {
        this.numberOfSessionsStart = response.body.length;
      });

      const getTeachers = {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/api/teacher`,
        headers: {
          authorization,
        },
      };

      cy.request(getTeachers).then((response) => {
        this.teachers = response.body;
      });
    });
  });

  it('should create a valid session saved in the database', () => {
    // go to this page
    cy.visit('/sessions/create');

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type('test!1234');

    cy.get('form').submit();

    // at this point the list of sessions should be visible

    // get the list of teachers, call to the backend is in the before method
    cy.intercept(
      {
        method: 'GET',
        url: 'api/teacher',
      },
      this.teachers
    );

    // click on create a new session, to enter the create session page
    cy.contains('button', 'Create').click();

    // on the create session page
    // populate the form
    cy.get('input[formControlName=name]').type('new session');
    cy.get('textarea[formControlName=description]').type(
      'new description of a session.'
    );
    // select the teacher in the mat-select
    cy.get('mat-select[formControlName=teacher_id]')
      .click()
      .get('mat-option')
      .contains(this.teachers[0].firstName + ' ' + this.teachers[0].lastName)
      .click();
    cy.get('input[formControlName=date]').type('2024-05-27');

    // click the save button
    cy.get('button[type="submit"]').click();

    // verify the number of sessions in database
    const getSessions = {
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/api/session`,
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    };

    cy.request(getSessions).then((response) => {
      this.newSessions = response.body;
      console.log(this.newSessions);
      this.numberOfSessions = response.body.length;

      // Assert there is a new session that has been saved in database
      expect(this.numberOfSessions).to.be.greaterThan(
        this.numberOfSessionsStart
      );
      expect(this.numberOfSessions - 1).to.be.equal(this.numberOfSessionsStart);
      // assert
      cy.url().should('include', '/sessions');
    });
  });

  it('should delete a session saved in the database', () => {
    //get id of the last session created
    let lastSession = this.newSessions[this.numberOfSessions - 1];
    console.log(lastSession);
    // go to this page
    cy.visit('/sessions/update/' + lastSession.id);

    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type('test!1234');

    cy.get('form').submit();

    // at this point the list of sessions should be visible

    //click on detail session of the last created session
    cy.get('[ng-reflect-router-link="detail,' + lastSession.id + '"]').click();

    // click the save button
    cy.contains('span', 'Delete').click();

    // verify the number of sessions in database
    const getSessions = {
      method: 'GET',
      url: `${Cypress.env('apiUrl')}/api/session`,
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    };

    cy.request(getSessions).then((response) => {
      this.numberOfSessions = response.body.length;

      // Assert the session is no longer in the database
      expect(this.numberOfSessions).to.be.equal(this.numberOfSessionsStart);
      // assert
      cy.url().should('include', '/sessions');
    });
  });
});
