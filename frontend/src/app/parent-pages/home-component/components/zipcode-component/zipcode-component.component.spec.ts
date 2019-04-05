import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodeComponentComponent } from './zipcode-component.component';

describe('ZipcodeComponentComponent', () => {
  let component: ZipcodeComponentComponent;
  let fixture: ComponentFixture<ZipcodeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipcodeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipcodeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
