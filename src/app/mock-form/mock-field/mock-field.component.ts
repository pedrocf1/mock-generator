import { Component, OnInit, Input } from '@angular/core';
import { MockField } from '../model/mock-field';
import { FieldType } from '../model/fieldType.interface';
import { MockFormService } from '../mock-form.service';
import { Types } from '../model/types.enum';

@Component({
  selector: 'app-mock-field',
  templateUrl: './mock-field.component.html',
  styleUrls: ['./mock-field.component.css']
})
export class MockFieldComponent implements OnInit {

  @Input() mockField: MockField;
  @Input() isChild: boolean;
  @Input() parentType: string;
  hasName: boolean;
  fieldTypes: Array<FieldType>;

  isCollapsed: number = Math.floor(Math.random() * 6) + 1;

  constructor(private mockFormService: MockFormService) {
    this.isChild = false;
    this.parentType = '';
    this.hasName = true;
  }

  ngOnInit() {
    this.fieldTypes = this.mockFormService.fieldTypes();
    this.decideIfHasName();
  }

  addField() {
    this.mockField.children.push(new MockField(null));
  }

  private decideIfHasName(): void {
    if (this.parentType === Types.Object || this.parentType === Types.Array) {
      this.hasName = true;
      return;
    }
    // else if(this.parentType === Types.Array){
    //   this.hasName = true;
    //   return;
    // }

    // if(this.mockField.fieldType === Types.Object && this.isChild){
    //   this.hasName = true;
    //   return;
    // }

    if (this.isComplexType() || this.mockField.fieldType === Types.Array) {
      this.hasName = false;
    }
    // else if(this.mockField.fieldType === Types.Array) {
    //   this.hasName = false;
    // }

  }

  private isComplexType(): boolean {
    return this.mockField.fieldType === Types.Array || this.mockField.fieldType === Types.Object;
  }
}