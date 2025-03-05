import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuacionViewComponent } from './actuacion-view.component';

describe('ActuacionViewComponent', () => {
  let component: ActuacionViewComponent;
  let fixture: ComponentFixture<ActuacionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActuacionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActuacionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
