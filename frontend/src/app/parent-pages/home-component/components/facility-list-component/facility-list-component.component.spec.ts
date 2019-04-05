import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityListComponentComponent } from './facility-list-component.component';

describe('FacilityListComponentComponent', () => {
  let component: FacilityListComponentComponent;
  let fixture: ComponentFixture<FacilityListComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityListComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
