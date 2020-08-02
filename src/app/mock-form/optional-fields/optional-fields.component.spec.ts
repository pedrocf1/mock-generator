import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalFieldsComponent } from './optional-fields.component';

describe('OptionalFieldsComponent', () => {
  let component: OptionalFieldsComponent;
  let fixture: ComponentFixture<OptionalFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
