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
    this.mockBody.fields.push(new MockField(null))
  }

  addField(){
    this.mockBody.fields.push(new MockField(null))
  }

  generateMock(){
    this.finalObj = {}
    console.log("this.mockBody", this.mockBody)
    this.mockBody.fields.forEach(mockField => {
      this.finalObj[mockField.name] = this.generateMockFieldValue(mockField.fieldType, mockField.optionFields)
    })
    console.log("OBJ GERADO", this.finalObj)
  }

  generateMockFieldValue(fieldType:Types, optionFields):any{

    const typesRamdomValues = {
      "Int":()=>{
        return Math.ceil(this._mockFormService.generateRandomRange())
      },
      "IntRange":()=>{
        return Math.round(this._mockFormService.generateRandomRange(optionFields.minRange, optionFields.maxRange))
      },
      "Double":()=>{
        return this._mockFormService.generateRandomRange()
      },
      "DoubleRange":()=>{
        return Math.round(this._mockFormService.generateRandomRange(optionFields.minRange, optionFields.maxRange))
      },
      "TextOnly":()=>{
        return this._mockFormService.generateStr(null, null, false, false)
      },
      "TextOnlyRange":()=>{
        return this._mockFormService.generateStr(optionFields.minRange, optionFields.maxRange, false, false)
      },
      "TextOnlyWithEspecialRange":()=>{
        return this._mockFormService.generateStr()
      },
      "Alphanumeric":()=>{
        return this._mockFormService.generateStr(optionFields.minRange, optionFields.maxRange, false, true)
      },
      "AlphanumericRange":()=>{
        return this._mockFormService.generateStr(optionFields.minRange, optionFields.maxRange, true, true)
      },
      "AlphanumericEspecialRange":()=>{
        return this._mockFormService.generateStr(optionFields.minRange, optionFields.maxRange, true)
      },
      "Object":()=> {return {}},
    }
    
    return typesRamdomValues[fieldType]()

  }



}
