import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockFieldComponent } from './mock-field.component';

describe('MockObjectFieldComponent', () => {
  let component: MockFieldComponent;
  let fixture: ComponentFixture<MockFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
