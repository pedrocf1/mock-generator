import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldType } from '../model/fieldType.interface';

@Component({
  selector: 'mock-object-field',
  templateUrl: './mock-object-field.component.html',
  styleUrls: ['./mock-object-field.component.css']
})
export class MockObjectFieldComponent implements OnInit {

  @Input("mockForm") mockForm: FormGroup
  @Input("fieldTypes") fieldTypes:Array<FieldType>

  constructor() { }

  ngOnInit() {
    console.log("ASDASDASD", this.mockForm)
  }

}
