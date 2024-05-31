/// <reference types="cypress" />

describe('Create Session ', () => {

    it('should not create session if the field date is not filled', () => {
        cy.visit('/sessions/create');

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
  
      let teachers;
      cy.intercept(
        {
          method: 'GET',
          url: 'api/teacher',
        },
        teachers = [
            {
                "id": 1,
                "lastName": "DELAHAYE",
                "firstName": "Margot",
                "createdAt": "2024-05-17T11:03:05",
                "updatedAt": "2024-05-17T11:03:05"
            },
            {
                "id": 2,
                "lastName": "THIERCELIN",
                "firstName": "Hélène",
                "createdAt": "2024-05-17T11:03:05",
                "updatedAt": "2024-05-17T11:03:05"
            }
        ]
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
      .contains(teachers[0].firstName + ' ' + teachers[0].lastName)
      .click();

        // assert
        cy.contains('Save').should('be.disabled');
    })


    it('should create session', () => {
        cy.visit('/sessions/create');

        //The post request to api/auth/login will return the body - simulation
    cy.intercept('POST', '/api/auth/login', {
        body: {
        token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b2dhQHN0dWRpby5jb20iLCJpYXQiOjE3MTcxNDY2MzUsImV4cCI6MTcxNzIzMzAzNX0.zmXp5Bxz5Ehs_WggZEOGjg40o0zFGx90Rpbw1ErnBpfWDoVfS_DZewZ0ICfhJB-5oAVxglqd9RxshWkK5qhAfh",
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
  
      let teachers;
      cy.intercept(
        {
          method: 'GET',
          url: 'api/teacher',
        },
        teachers = [
            {
                "id": 1,
                "lastName": "DELAHAYE",
                "firstName": "Margot",
                "createdAt": "2024-05-17T11:03:05",
                "updatedAt": "2024-05-17T11:03:05"
            },
            {
                "id": 2,
                "lastName": "THIERCELIN",
                "firstName": "Hélène",
                "createdAt": "2024-05-17T11:03:05",
                "updatedAt": "2024-05-17T11:03:05"
            }
        ]
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
      .contains(teachers[0].firstName + ' ' + teachers[0].lastName)
      .click();
    cy.get('input[formControlName=date]').type('2024-05-27');
        // click the save button
        cy.get('button[type="submit"]').click();

        // assert
        cy.get('.mat-simple-snack-bar-content').should('contain.text', 'Session created !')
        cy.url().should('include', '/sessions')
    })

})