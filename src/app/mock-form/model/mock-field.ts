import { JsonPipe } from '@angular/common'

export class MockField  {

    name:string
    type:string
    children:Array<MockField>
    fieldType:string
    optionFields:Array<any>

    constructor(json:any){
        this.name = json?(json.name?json.name:null):null
        this.type = json?(json.type?json.type:null):null
        this.children = json?(json.children?json.children:new Array<MockField>()):new Array<MockField>()
        this.fieldType = json?(json.fieldType?json.fieldType:null):null
        this.optionFields = json?(json.optionFields?json.optionFields:null):null
    }

}