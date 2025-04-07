import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSavedDonutComponent } from './most-saved-donut.component';

describe('MostSavedDonutComponent', () => {
  let component: MostSavedDonutComponent;
  let fixture: ComponentFixture<MostSavedDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostSavedDonutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostSavedDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
