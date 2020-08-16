import { Injectable } from '@angular/core';
import { FieldType } from './model/fieldType.interface';
import { Types } from './model/types.enum';

@Injectable({
  providedIn: 'root'
})


export class MockFormService {

  textString:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz"; 
  numbersString:string = "0123456789"; 
  especialString:string = `"'~'!@#$%¨&*()-_+=|\\/?:;.{}[]^~´<>,`; 
  constructor() { }

  fieldTypes=():Array<FieldType>=>{

    return[
      {
        value: Types.Int,
        label:"Interger"
      },
      {
        value: Types.IntRange,
        label:"Integer with Range"
      },
      {
        value: Types.Double,
        label:"Double"
      },
      {
        value: Types.DoubleRange,
        label:"Double with Range"
      },
      {
        value:Types.TextOnly,
        label:"Text Only"
      },
      {
        value:Types.TextOnlyRange,
        label:"Text Only Range"
      },
      {
        value:Types.TextOnlyWithEspecialRange,
        label:"Alphanumeric With Especial Caracteres Range"
      },
      {
        value:Types.Alphanumeric,
        label:"Alphanumeric"
      },
      {
        value:Types.AlphanumericRange,
        label:"Alphanumeric Range"
      },
      {
        value:Types.AlphanumericEspecialRange,
        label:"Alphanumeric Especial Caracteres Range"
      },
      {
        value:Types.Object,
        label:"Object"
      }

    ]

  }
  
  public generateStr(min:number=null, max:number=null, especial:boolean=false, numbers:boolean=false):string{
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

  public generateRandomRange(min:number=null, max:number=null) {
    min = min?min:-9999999999
    return Math.random() * (max?max:9999999999 - min) + min
  }

}
