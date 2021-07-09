import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSlotsComponent } from './appointment-slots.component';

describe('AppointmentSlotsComponent', () => {
  let component: AppointmentSlotsComponent;
  let fixture: ComponentFixture<AppointmentSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentSlotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
