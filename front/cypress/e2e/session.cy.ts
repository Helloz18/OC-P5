/// <reference types="cypress" />

describe('Session spec', () => {
    it('get list of sessions', () => {
      cy.visit('/sessions')

      
    //The post request to api/auth/login will return the body - simulation
    cy.intercept('POST', '/api/auth/login', {
        body: {
          id: 1,
          username: 'userName',
          firstName: 'firstName',
          lastName: 'lastName',
          admin: true
        },
      })
  
      //The get request to api/session will return a list of sessions - simulation
      cy.intercept(
        {
          method: 'GET',
          url: '/api/session',
        },
        [
            {
                "id": 1,
                "name": "session test",
                "date": "2024-05-21T07:04:24.000+00:00",
                "teacher_id": 1,
                "description": "test",
                "users": [
                    2
                ],
                "createdAt": "2024-05-21T09:04:24",
                "updatedAt": "2024-05-21T09:04:24"
            }
        ]).as('session')
  
      cy.get('input[formControlName=email]').type("yoga@studio.com")
      cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
  

      // assert that the user connected is the owner of the session and an admin
      cy.contains("Create").should('be.visible')
      cy.contains("Detail").should('be.visible')
      cy.contains("Edit").should('be.visible')
      cy.url().should('include', '/sessions')  
    })


    it('get list of sessions but cannot change session', () => {
        cy.visit('/sessions')
  
        
      //The post request to api/auth/login will return the body - simulation
      cy.intercept('POST', '/api/auth/login', {
          body: {
            id: 2,
            username: 'userName',
            firstName: 'firstName',
            lastName: 'lastName',
            admin: false
          },
        })
    
        //The get request to api/session will return a list of sessions - simulation
        cy.intercept(
          {
            method: 'GET',
            url: '/api/session',
          },
          [
              {
                  "id": 1,
                  "name": "session test",
                  "date": "2024-05-21T07:04:24.000+00:00",
                  "teacher_id": 1,
                  "description": "test",
                  "users": [
                      2
                  ],
                  "createdAt": "2024-05-21T09:04:24",
                  "updatedAt": "2024-05-21T09:04:24"
              }
          ]).as('session')
    
        cy.get('input[formControlName=email]').type("yoga@studio.com")
        cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
    
  
        // assert that the user connected is not the owner of the session and not an admin
        cy.contains("Create").should('not.exist')
        cy.contains("Detail").should('be.visible') 
        cy.contains("Edit").should('not.exist')
        cy.url().should('include', '/sessions')  
      })
})