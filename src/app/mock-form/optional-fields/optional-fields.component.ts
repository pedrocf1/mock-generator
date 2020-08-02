import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'optional-fields',
  templateUrl: './optional-fields.component.html',
  styleUrls: ['./optional-fields.component.css']
})
export class OptionalFieldsComponent implements OnInit {

  optionalFieldType:string

  @Input() set fieldType(fieldType:string){
    this.optionalFieldType = fieldType
    this.fieldType&&this.generateOptionField()
  }
  get fieldType():string{
    return this.optionalFieldType
  }

  @Input() optionFields:any

  constructor() { }

  ngOnInit() {

  }

  generateOptionField(){
    console.log("VOU SETAR", this.fieldType, this.fieldType.toLowerCase().includes('range'))
    // if (this.fieldType.toLowerCase().includes('range')) {
    //   this.optionFields={
    //     minRange:0,
    //     maxRange:1
    //   }
    // }else{
    //   this.optionFields=null
    // }
  }

}
