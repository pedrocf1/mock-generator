import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MockField } from '../model/mock-field';
import { FieldType } from '../model/fieldType.interface';
import { MockFormService } from '../mock-form.service';

@Component({
  selector: 'mock-field',
  templateUrl: './mock-field.component.html',
  styleUrls: ['./mock-field.component.css']
})
export class MockFieldComponent implements OnInit {

  @Input() mockField: MockField
  fieldTypes:Array<FieldType>

  isCollapsed:number = Math.floor(Math.random() * 6) + 1  

  constructor(private _mockFormService:MockFormService) { }

  ngOnInit() {
    this.fieldTypes = this._mockFormService.fieldTypes()
  }

  addField(){
    this.mockField.children.push(new MockField(null))
  }

}