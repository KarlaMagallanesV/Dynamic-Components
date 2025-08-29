import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylistProfile } from './stylist-profile';

describe('StylistProfile', () => {
  let component: StylistProfile;
  let fixture: ComponentFixture<StylistProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StylistProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylistProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
