import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActuacionComponentComponent } from './actuacion-component.component';

describe('ActuacionComponentComponent', () => {
  let component: ActuacionComponentComponent;
  let fixture: ComponentFixture<ActuacionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActuacionComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActuacionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
