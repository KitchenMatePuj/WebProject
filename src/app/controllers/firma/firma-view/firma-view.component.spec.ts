import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaViewComponent } from './firma-view.component';

describe('FirmaViewComponent', () => {
  let component: FirmaViewComponent;
  let fixture: ComponentFixture<FirmaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirmaViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
