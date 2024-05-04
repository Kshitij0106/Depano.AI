import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderSelectionComponent } from './gender-selection.component';

describe('GenderSelectionComponent', () => {
  let component: GenderSelectionComponent;
  let fixture: ComponentFixture<GenderSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
