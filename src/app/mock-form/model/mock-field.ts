import { Types } from './types.enum'

export class MockField  {

    name:string
    fieldType:Types
    children:Array<MockField>
    optionFields:any

    constructor(json:any){
        this.name = json?(json.name?json.name:null):null
        this.children = json?(json.children?json.children:new Array<MockField>()):new Array<MockField>()
        this.fieldType = json?(json.fieldType?json.fieldType:null):null
        this.optionFields = json?(json.optionFields?json.optionFields:{}):{}
    }

}