/// <reference types="cypress" />

describe('Create Session with Real Backend', () => {
  let response;
  let sessions;
  let token;
  let teachers;
  let numberOfSessionsStart : number;
  let newSessions;
  let numberOfSessions : number;
  beforeEach(() => {


    // call to the backend
    cy.request('POST', `${Cypress.env('apiUrl')}/api/auth/login`, {
      email: 'yoga@studio.com',
      password: 'test!1234',
    }).then((response) => {
      this.response = response;
      this.token = response.body.token;


      const authorization =`Bearer ${this.token}`;

      const getSessions = {
        method: 'GET',

        url: `${Cypress.env('apiUrl')}/api/session`,
        headers: {
          authorization,
          'Content-Type': 'application/json',
        },
      };

      cy.request(getSessions).then((response) => {
        this.sessions = response.body;
        this.numberOfSessionsStart = response.body.length;
      });

      const getTeachers = {
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/api/teacher`,
        headers: {
          authorization,
        },
      };

      cy.request(getTeachers)
        .then((response) => {
          this.teachers = response.body;
        });

    });

  });

  it('should create a valid session saved in the database', () => {

    cy.intercept('POST', 'api/session', (req) => {
      // Attach the Bearer token to the request
      
       // req.headers['authorization'] = authorization;
        req.headers['Authorization'] = 'Bearer' + ' '+this.token;
      // Add default value to the request body
        req.body = {
          ...req.body,
          users: [] // Add the missing field with its default value
      };
        // Debug log
        console.log('Request headers:', req.headers);

    }).as('createSession')

    // go to this page
    cy.visit('/sessions/create');

    // login
    // get the response from the backend and populate the return 
    cy.intercept('POST', 'api/auth/login', {
      body: {
        token: this.token,
        type: "Bearer",
        id: this.response.body.id,
        username: this.response.body.username,
        firstName: this.response.body.firstName,
        lastName: this.response.body.lastName,
        admin: this.response.body.admin,
      },

    });


    // get the list of sessions that has been get in the before method
     cy.intercept('GET', 'api/session', this.sessions);

    // fill the form for login
    cy.get('input[formControlName=email]').type('yoga@studio.com');
    cy.get('input[formControlName=password]').type('test!1234');
    //cy.contains('button', 'Submit').click();
    cy.get('form').submit()


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
    //cy.contains('button', 'Save').click();
    cy.get('button[type="submit"]').click();
    ///// PRoblem here, the request is not intercepted

    // Wait for the intercepted request
    cy.wait('@createSession').then((interception) => {
      // Ensure the request was made with the correct data
      expect(interception.request.body).to.include({
        name: 'new session',
        description: 'new description of a session.',
      });
      // Ensure the Authorization header is present and correct
      expect(interception.request.headers).to.have.property('Authorization', `Bearer ${this.token}`);
      // Check the response status
      expect(interception.response!.statusCode).to.eq(200);

      // call to the backend
      // const saveRequest = {
      //   method: 'POST',
      //   url: `${Cypress.env('apiUrl')}/api/session`,
      //   body: {
      //     name: 'new session',
      //     date: '2024-05-27',
      //     teacher_id: 1,
      //     users: null,
      //     description: 'new description of a session.',
      //   },
      //   headers: {
      //     authorization: `Bearer ${this.token}`,
      //   },
      // };

    //   // cy.request(saveRequest).then((response) => {
    //   //   // Assert the response from cy.request
    //   //   expect(response.status).to.eq(200);
    //   // });

    //   });
     });


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
        this.numberOfSessions = response.body.length;

        // Assert there is a new session that has been saved in database
        expect(this.numberOfSessions).to.be.greaterThan(this.numberOfSessionsStart);
        expect(this.numberOfSessions - 1).to.be.equal(this.numberOfSessionsStart);
    // assert
    cy.url().should('include', '/sessions');
  });
});
});
