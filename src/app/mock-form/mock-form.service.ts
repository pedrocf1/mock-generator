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
        label:"Integer with Range"
      },
      {
        value:"double",
        label:"Double"
      },
      {
        value:"doubleRange",
        label:"Double with Range"
      },
      {
        value:"textOnly",
        label:"Text Only"
      },
      {
        value:"textOnlyRange",
        label:"Text Only Range"
      },
      {
        value:"Alphanumeric",
        label:"Alphanumeric"
      },
      {
        value:"AlphanumericRange",
        label:"Alphanumeric Range"
      },
      {
        value:"Object",
        label:"Object"
      }

    ]

  }

  createObject(mockObject){



  }

}
