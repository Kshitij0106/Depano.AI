import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalTypesComponent } from './optional-types.component';

describe('OptionalTypesComponent', () => {
  let component: OptionalTypesComponent;
  let fixture: ComponentFixture<OptionalTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionalTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionalTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
