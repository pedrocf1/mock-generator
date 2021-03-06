import { Component, OnInit, Type } from '@angular/core';
import { MockField } from './model/mock-field';
import { MockBody } from './model/mock-body';
import { Types } from './model/types.enum';
import { MockFormService } from './mock-form.service';
import { Constants } from './model/Constants';


@Component({
  selector: 'app-mock-form',
  templateUrl: './mock-form.component.html',
  styleUrls: ['./mock-form.component.css']
})
export class MockFormComponent implements OnInit {

  mockBody: MockBody;
  finalObj = undefined;

  constructor(private mockFormService: MockFormService) {

  }


  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.mockBody = new MockBody(null);
    this.addField();
  }

  addField() {
    this.mockBody.fields.push(new MockField(null));
  }

  generateMock() {
    this.finalObj = {}
    console.log("this.mockBody", this.mockBody);
    this.mockBody.fields.forEach(mockField => {
      console.log("mockField", mockField);

      this.createMockField(mockField);


    })
    console.log("OBJ GERADO", this.finalObj)
  }

  private createMockField(mockField) {

    switch (mockField.fieldType) {
      case Types.Object:
        console.log("Types.Object", mockField);
        this.createObjectField(mockField);
        break;

      case Types.Array:
        this.createArrayField(mockField);
        break;

      default:
        this.finalObj[mockField.name] = this.mockFormService.generateMockFieldValue(mockField.fieldType, mockField.optionFields);
        break;
    }

  }

  private createObjectField(mockField: MockField) {
    console.log("createObjectField", mockField);
    this.finalObj[mockField.name] = this.mockFormService.generateMockFieldValue(mockField.fieldType, mockField.optionFields);

    mockField.children.forEach(child => {
      if (Types.Object === child.fieldType) {
        this.finalObj[mockField.name][child.name] = this.mockFormService.generateMockFieldValue(child.fieldType, child.optionFields);

      } else {
        this.createMockField(child);
      }
    });

  }

  private createArrayField(mockField: MockField) {
    this.finalObj[mockField.name] = this.mockFormService.generateMockFieldValue(mockField.fieldType, mockField.optionFields);
    console.log("mockField.optionFields[Constants.MIN_RANGE]", mockField.optionFields[Constants.MIN_RANGE]);
    mockField.children.forEach(child => {
      console.log("CHILD", child)
      for (let index = 0; index < mockField.optionFields[Constants.MIN_RANGE]; index++) {
        if (child.fieldType !== String(Types.Object) && child.fieldType !== String(Types.Array)) {
          console.log("this.finalObj[mockField.name][index]", this.finalObj[mockField.name][index]);
          if (this.finalObj[mockField.name][index] === undefined) {
            this.finalObj[mockField.name][index] = {};
          }
          this.finalObj[mockField.name][index][child.name] = this.mockFormService.generateMockFieldValue(child.fieldType, child.optionFields);

        } else if (child.fieldType === String(Types.Object)) {
          this.finalObj[mockField.name].push(this.mockFormService.generateMockFieldValue(child.fieldType, child.optionFields));
          const arrayleng = this.finalObj[mockField.name].length - 1;
          child.children.forEach(newChild => {
            this.finalObj[mockField.name][arrayleng][newChild.name] = this.mockFormService.generateMockFieldValue(newChild.fieldType, newChild.optionFields);
          });

        } else {
          this.finalObj[mockField.name].push(this.mockFormService.generateMockFieldValue(child.fieldType, child.optionFields));

        }
      }

    });

  }

}
