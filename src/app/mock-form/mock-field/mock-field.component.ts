import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MockField } from '../model/mock-field';
import { FieldType } from '../model/fieldType.interface';
import { MockFormService } from '../mock-form.service';
import { Types } from '../model/types.enum';
import { runInThisContext } from 'vm';

@Component({
  selector: 'mock-field',
  templateUrl: './mock-field.component.html',
  styleUrls: ['./mock-field.component.css']
})
export class MockFieldComponent implements OnInit {

  @Input() mockField: MockField
  @Input() isChild: boolean = false
  @Input() parentType: string = ""
  
  hasName:boolean = true
  fieldTypes:Array<FieldType>

  isCollapsed:number = Math.floor(Math.random() * 6) + 1  

  constructor(private _mockFormService:MockFormService) { }

  ngOnInit() {
    this.fieldTypes = this._mockFormService.fieldTypes()
    this.decideIfHasName()
  }

  addField(){
    this.mockField.children.push(new MockField(null))
  }

  private decideIfHasName():void{
    
    if(this.parentType === Types.Object){
      this.hasName = true;
      return;
    }else if(this.parentType === Types.Array){
      this.hasName = true;
      return;
    }

    // if(this.mockField.fieldType === Types.Object && this.isChild){
    //   this.hasName = true;
    //   return;
    // }

    if(this.isComplexType()){
      this.hasName = false;
    }else if(this.mockField.fieldType===Types.Array){
      this.hasName = false;
    }

  }

  private isComplexType():boolean{
    return this.mockField.fieldType===Types.Array || this.mockField.fieldType===Types.Object
  }

}