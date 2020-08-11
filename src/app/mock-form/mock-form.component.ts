import { Component, OnInit } from '@angular/core';
import { FieldType } from './model/fieldType.interface';
import { MockField } from './model/mock-field';
import { MockBody } from './model/mock-body';
import { Types } from './model/types.enum';


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
    })
    console.log("OBJ GERADO", obj)
  }

  generateMockFieldValue(fieldType:Types, optionFields):any{
    if(fieldType == Types.Int){
      return Math.ceil(this.generateRandomRange())
    }else if(fieldType == Types.IntRange){
      return Math.round(this.generateRandomRange(optionFields.minRange, optionFields.maxRange))
    }else if(fieldType == Types.Double){
      return this.generateRandomRange()
    }else if(fieldType == Types.DoubleRange){
      return Math.round(this.generateRandomRange(optionFields.minRange, optionFields.maxRange))
    }else if(fieldType == Types.TextOnly){
      return this.generateStr(null, null, false, false)
    }else if(fieldType == Types.TextOnlyRange){
      return this.generateStr(optionFields.minRange, optionFields.maxRange, false, false)
    }else if(fieldType == Types.Alphanumeric){
      return this.generateStr()
    }else if(fieldType == Types.AlphanumericRange){
      return this.generateStr(optionFields.minRange, optionFields.maxRange, false, true)
    }else if(fieldType == Types.AlphanumericEspecialRange){
      return this.generateStr(optionFields.minRange, optionFields.maxRange, true, true)
    }else if(fieldType == Types.TextOnlyWithEspecialRange){
      return this.generateStr(optionFields.minRange, optionFields.maxRange, true)
    }
  }

  private generateStr(min:number=null, max:number=null, especial:boolean=false, numbers:boolean=false):string{
    let str:string = this.textString+(especial?this.especialString:"")
    str += numbers?this.numbersString:""

    const strLength:number = str.length
    let newStr:string = ""

    const loopNumber:number =  Math.round(this.generateRandomRange(min?min:0, max?max:strLength))
    
    for(let index = 0; index < loopNumber; index++) {
      const randomNumber:number = Math.ceil(this.generateRandomRange(0, strLength-1))
      newStr+=str[randomNumber]
    }
    
    return newStr
  }

  private generateRandomRange(min:number=null, max:number=null) {
    min = min?min:Number.MIN_VALUE
    return Math.random() * (max?max:Number.MAX_VALUE - min) + min;
  }

}
