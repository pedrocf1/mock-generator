import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockObjectFieldComponent } from './mock-object-field.component';

describe('MockObjectFieldComponent', () => {
  let component: MockObjectFieldComponent;
  let fixture: ComponentFixture<MockObjectFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockObjectFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockObjectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
