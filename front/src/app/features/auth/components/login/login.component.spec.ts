import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [SessionService],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit when submit button is clicked', () => {
    const submitSpy = jest.spyOn(component, 'submit');
    const form = fixture.debugElement.query(By.css('form'));

    // Set form value
    component.form.controls['email'].setValue('yoga@studio.com');
    component.form.controls['password'].setValue('test!1234');

    // Trigger form submit
    form.triggerEventHandler('submit', null);

    expect(submitSpy).toHaveBeenCalled();
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual({ email: 'yoga@studio.com', password: 'test!1234' });
  });
});
