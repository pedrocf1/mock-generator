import { Component, OnInit } from '@angular/core';
import { FieldType } from './model/fieldType.interface';
import { MockField } from './model/mock-field';
import { MockBody } from './model/mock-body';


@Component({
  selector: 'app-mock-form',
  templateUrl: './mock-form.component.html',
  styleUrls: ['./mock-form.component.css']
})
export class MockFormComponent implements OnInit {

  mockBody:MockBody
  textString:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz"; 
  numbersString:string = "0123456789"; 
  especialString:string = `"'~'!@#$%¨&*()-_+=|\\/?:;.{}[]^~´<>,`; 

  ngOnInit(): void {
    this.initialize()
  }

  initialize(){
    this.mockBody = new MockBody(null)
    this.mockBody.fields.push(new MockField(null))
  }


  addField(){
    this.mockBody.fields.push(new MockField(null))
  }

  generateMock(){
    let obj = {}
    console.log("this.mockBody", this.mockBody)
    this.mockBody.fields.forEach(mockField => {
      obj[mockField.name] = this.generateMockFieldValue(mockField.fieldType, mockField.optionFields)
    });
    console.log("OBJ GERADO", obj)
  }

  generateMockFieldValue(fieldType:string, optionFields):any{
    console.log("optionFields",optionFields)
    if(fieldType == 'int'){
      return Math.round(this.generateRandomRange(Number.MIN_VALUE, Number.MAX_VALUE))
    }else if(fieldType == 'intRange'){
      return Math.round(this.generateRandomRange(optionFields.minRange, optionFields.maxRange))
    }else if(fieldType == 'double'){
      return this.generateRandomRange(Number.MIN_VALUE, Number.MAX_VALUE)
    }else if(fieldType == 'doubleRange'){
      return this.generateRandomRange(Number.MIN_VALUE, Number.MAX_VALUE)
    }else if(fieldType == 'textOnly'){
      return this.generateRandomRange(Number.MIN_VALUE, Number.MAX_VALUE)
    }else if(fieldType == 'textOnlyRange'){
      return this.generateRandomRange(Number.MIN_VALUE, Number.MAX_VALUE)
    }
  }

  generateRandomRange(min:number, max:number) {
    min = min?min:Number.MIN_VALUE
    return Math.random() * (max?max:Number.MAX_VALUE - min) + min;
  }

}
