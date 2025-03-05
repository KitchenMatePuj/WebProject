import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageComponentComponent } from './storage-component.component';

describe('StorageComponentComponent', () => {
  let component: StorageComponentComponent;
  let fixture: ComponentFixture<StorageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
