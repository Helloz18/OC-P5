import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

describe('SessionService', () => {
  let service: SessionService;
  let user: SessionInformation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be a user while logged out', () => {
  service.logOut(), () => {
    expect(service.isLogged).toBeFalsy(),
    expect(service.sessionInformation).toBe(undefined);
    }
  });

  it('should be a user while log in', () => {
    service.logIn(user), () => {
      expect(service.isLogged).toBeTruthy(),
      expect(service.sessionInformation).toBe(user);
      }
    });
});
