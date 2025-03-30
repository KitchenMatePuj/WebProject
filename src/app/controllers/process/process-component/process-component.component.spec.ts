import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessComponentComponent } from './process-component.component';

describe('ProcessComponentComponent', () => {
  let component: ProcessComponentComponent;
  let fixture: ComponentFixture<ProcessComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
