import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedReportsComponent } from './personalized-reports.component';

describe('PersonalizedReportsComponent', () => {
  let component: PersonalizedReportsComponent;
  let fixture: ComponentFixture<PersonalizedReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizedReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
