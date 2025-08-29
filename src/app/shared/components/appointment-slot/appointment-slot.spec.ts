import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSlot } from './appointment-slot';

describe('AppointmentSlot', () => {
  let component: AppointmentSlot;
  let fixture: ComponentFixture<AppointmentSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentSlot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentSlot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
