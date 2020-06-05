import { Injectable } from '@angular/core';
import { FieldType } from './model/fieldType.interface';

@Injectable({
  providedIn: 'root'
})


export class MockFormService {

  constructor() { }

  fieldTypes=():Array<FieldType>=>{

    return[
      {
        value:"int",
        label:"Interger"
      },
      {
        value:"intRange",
        label:"Integer with Limited Range"
      },
      {
        value:"textOnly",
        label:"Text Only"
      },
      {
        value:"textOnlyLimited",
        label:"Text Only Limited Range"
      },
      {
        value:"Alphanumeric",
        label:"Alphanumeric"
      },
      {
        value:"AlphanumericLimited",
        label:"Alphanumeric Limited Range"
      }

    ]

  }

}
