import { Component, OnInit, Input } from '@angular/core';
import { Types } from '../model/types.enum';

@Component({
  selector: 'optional-fields',
  templateUrl: './optional-fields.component.html',
  styleUrls: ['./optional-fields.component.css']
})
export class OptionalFieldsComponent implements OnInit {

  optionalFieldType:Types

  @Input() set fieldType(fieldType:Types){
    this.optionalFieldType = fieldType
    this.fieldType&&this.generateOptionField()
  }

  get fieldType():Types{
    return this.optionalFieldType
  }

  @Input() optionFields:any

  constructor() { }

  ngOnInit() {

  }

  generateOptionField(){
    console.log("VOU SETAR", this.fieldType)
  }

  isRangeField():boolean{
    
    if(Types.IntRange === this.fieldType || Types.DoubleRange === this.fieldType || Types.TextOnlyRange === this.fieldType ||
       Types.TextOnlyWithEspecialRange === this.fieldType || Types.AlphanumericRange === this.fieldType || Types.AlphanumericEspecialRange === this.fieldType)
    {
      return true
    }
    return false
  }

  isArrayField():boolean{
    return Types.Array === this.fieldType
  }

}
