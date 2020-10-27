import { MockField } from './mock-field';

export class MockBody  {

    fields: Array<MockField>;
    isArray: boolean;
    minRange: number;
    maxRange: number;

    constructor(json: any){
        this.fields = json ? (json.fields ? json.fields : new Array<MockField>()) : new Array<MockField>();
        this.isArray = json ? (json.isArray ? json.isArray : false) : false;
        this.minRange = json ? (json.minRange ? json.minRange : null) : null;
        this.maxRange = json ? (json.maxRange ? json.maxRange : null) : null;
    }

}
