import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';
import { expect } from '@jest/globals';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MeComponent } from './me.component';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs/internal/observable/of';
import { User } from 'src/app/interfaces/user.interface';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  const mockSessionService = {
    sessionInformation: {
      admin: false,
      id: 2,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        UserService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user on initialisation', () => {
    const mockUser: User = {
      id: 2,
      email: 'user@studio.com',
      password: 'test!1234',
      firstName: 'User',
      lastName: 'Yoga',
      admin: false,
      createdAt: new Date(),
    };
    // when getById is called, then return the mockUser
    jest.spyOn(userService, 'getById').mockReturnValue(of(mockUser));

    // when ngOnInit is called
    component.ngOnInit();

    // Check that the method is called with the id of the user
    expect(userService.getById).toHaveBeenCalledWith('2');

    // Verify that the user in the component is the mockUser
    expect(component.user).toEqual(mockUser);
  });

  it('should go back when mat-icon arrow back is clicked', () => {
    const backSpy = jest.spyOn(window.history, 'back');

    const button = fixture.nativeElement.querySelectorAll('button')[0];
    button.click();

    expect(backSpy).toHaveBeenCalled();
  });

  it('should call delete method if user is not admin and delete is clicked', () => {
    const mockUser: User = {
      id: 2,
      email: 'user@studio.com',
      password: 'test!1234',
      firstName: 'User',
      lastName: 'Yoga',
      admin: false,
      createdAt: new Date(),
    };
    // when getById is called, then return the mockUser
    jest.spyOn(userService, 'getById').mockReturnValue(of(mockUser));

    // when ngOnInit is called
    component.ngOnInit();

    //update with user
    fixture.detectChanges();

    const deleteSpy = jest.spyOn(component, 'delete');

    const button = fixture.nativeElement.querySelectorAll('button')[1];
    const buttonText = button.textContent.trim(); // check text in button

    // verify text of the button, to be sure we click on the right one
    expect(buttonText).toContain('Detail');

    button!.click();
    expect(deleteSpy).toHaveBeenCalled();
  });

  it('should not be able to call delete method if user is admin', () => {
    const mockAdmin: User = {
      id: 1,
      email: 'admin@studio.com',
      password: 'test!1234',
      firstName: 'User',
      lastName: 'Yoga',
      admin: true,
      createdAt: new Date(),
    };
    // when getById is called, then return the mockUser
    jest.spyOn(userService, 'getById').mockReturnValue(of(mockAdmin));

    // when ngOnInit is called
    component.ngOnInit();
    // update with user
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelectorAll('button')[1];
    expect(button).toBeUndefined;
  });
});
