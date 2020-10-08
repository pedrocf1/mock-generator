import { Component, OnInit } from '@angular/core';
import { FieldType } from './model/fieldType.interface';
import { MockField } from './model/mock-field';
import { MockBody } from './model/mock-body';
import { Types } from './model/types.enum';
import { MockFormService } from './mock-form.service';


@Component({
  selector: 'app-mock-form',
  templateUrl: './mock-form.component.html',
  styleUrls: ['./mock-form.component.css']
})
export class MockFormComponent implements OnInit {

  mockBody:MockBody
  finalObj=undefined 

  constructor(private _mockFormService:MockFormService){

  }


  ngOnInit(): void {
    this.initialize()
  }

  initialize(){
    this.mockBody = new MockBody(null)
    this.addField()
  }

  addField(){
    this.mockBody.fields.push(new MockField(null))
  }

  generateMock(){
    this.finalObj = {}
    console.log("this.mockBody", this.mockBody)
    this.mockBody.fields.forEach(mockField => {
      console.log("mockField",mockField)

      this.createMockField(mockField)


    })
    console.log("OBJ GERADO", this.finalObj)
  }

  private createMockField(mockField){

    switch (mockField.fieldType) {
      case Types.Object:
        this.createObjectField(mockField)
      break;
    
      case Types.Array:
        this.createArrayField(mockField)
      break;
      
      default:
        this.finalObj[mockField.name] = this._mockFormService.generateMockFieldValue(mockField.fieldType, mockField.optionFields)
      break;
    }

  }

  private createObjectField(mockField:MockField){
    this.finalObj[mockField.name] = this._mockFormService.generateMockFieldValue(mockField.fieldType, mockField.optionFields)

    mockField.children.forEach(child=>{
      if(Types.Object === child.fieldType){
        this.finalObj[mockField.name][child.name] = this._mockFormService.generateMockFieldValue(child.fieldType, child.optionFields)
      }else{
        this.createMockField(child)
      }
    })

  }

  private createArrayField(mockField:MockField){
    this.finalObj[mockField.name] = this._mockFormService.generateMockFieldValue(mockField.fieldType, mockField.optionFields)

    mockField.children.forEach(child=>{
      if (Types.Array !== child.fieldType && Types.Object !== child.fieldType) {
        for (let index = 0; index < 10; index++) {
          this.finalObj[mockField.name].push(this._mockFormService.generateMockFieldValue(child.fieldType, child.optionFields))  
        }

      }else{
        this.createMockField(child)
      }
      
    })

  }

}
