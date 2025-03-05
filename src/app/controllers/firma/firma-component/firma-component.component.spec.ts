import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaComponentComponent } from './firma-component.component';

describe('FirmaComponentComponent', () => {
  let component: FirmaComponentComponent;
  let fixture: ComponentFixture<FirmaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmaComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
