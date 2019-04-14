import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonComponentComponent } from './comparison-component.component';

describe('ComparisonComponentComponent', () => {
  let component: ComparisonComponentComponent;
  let fixture: ComponentFixture<ComparisonComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
