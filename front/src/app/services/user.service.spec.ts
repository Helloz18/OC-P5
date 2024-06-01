import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../interfaces/user.interface';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule,
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a user with id 1', () => {

    const mockUser: User = { 
      id: 1, 
      email: 'yoga@studio.com',
      firstName: 'yoga',
      lastName: 'Admin',
      password: "test!1234",
      createdAt: new Date(),
      admin: true
    };
  
    service.getById('1').subscribe(userReturned => {
      expect(userReturned).toEqual(mockUser);
    });
  
    const req = httpTestingController.expectOne('api/user/1');
    expect(req.request.method).toBe('GET');
  });

  it('should delete a user with id 1', () => {
  
    service.delete('1').subscribe((response) => {
      expect(response).toBeNull;
    });
  
    const req = httpTestingController.expectOne('api/user/1');
    expect(req.request.method).toBe('DELETE');
   });
  
});
