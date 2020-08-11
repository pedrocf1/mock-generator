import { Injectable } from '@angular/core';
import { FieldType } from './model/fieldType.interface';
import { Types } from './model/types.enum';

@Injectable({
  providedIn: 'root'
})


export class MockFormService {

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

}
