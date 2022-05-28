import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectiveDividerComponent } from './selective-divider.component';

describe('SelectiveDividerComponent', () => {
  let component: SelectiveDividerComponent;
  let fixture: ComponentFixture<SelectiveDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectiveDividerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectiveDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
