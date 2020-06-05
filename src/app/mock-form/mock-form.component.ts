import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { MockFormService } from './mock-form.service';
import { FieldType } from './model/fieldType.interface';

function ratingRange(min:number, max:number): ValidatorFn{
  return (c: AbstractControl): {[key: string]: boolean} | null =>{
    if (c.value !== null && (isNaN(c.value) || c.value<min || c.value>max)) {
      return {'range':true}
    }
    return null
  }
}

function emailMatcher(c:AbstractControl): {[key:string]:boolean}|null{
    const emailControl = c.get('email')
    const confirmControl = c.get('confirmEmail')

    if(emailControl.pristine || confirmControl.pristine){
      return null
    }

    if(emailControl.value === confirmControl.value){
      return null
    }
    return {'match':true}
}

@Component({
  selector: 'app-mock-form',
  templateUrl: './mock-form.component.html',
  styleUrls: ['./mock-form.component.css']
})
export class MockFormComponent implements OnInit {

  formMock:FormGroup
  fieldTypes:Array<FieldType>

  get mockField():FormArray{
    return this.formMock.get("mockField") as FormArray
  }

  constructor(private _fb: FormBuilder,
              private _mockSerivece:MockFormService) { }

  ngOnInit() {
    this.initiateFormMock()
    this.getFieldTypes()
    console.log("this.formMock",this.formMock)
  }
  
  getFieldTypes=()=>{
    this.fieldTypes = this._mockSerivece.fieldTypes()
  }

  initiateFormMock=()=>{
    this.formMock = this._fb.group({
      mockField: this._fb.array([this.buildField()])
    })
  }

  buildField=(): FormGroup=>{
    const formGroup=this._fb.group({
      fieldName:["",[Validators.required]],
      fieldType:["",[Validators.required]]
    })
    formGroup.get("fieldType").valueChanges.subscribe(value=> this.fieldTypeSelection(formGroup, value))
    return formGroup
  }

  getOptionalsFieldsFormGroupFrom=(formGroup:FormGroup):FormGroup=>{
    return formGroup.get("optionalsFields") as FormGroup
  }
  
  fieldTypeSelection=(formGroup:FormGroup, value)=>{
    formGroup.addControl("optionalsFields", this.buildOptionalsFields())
    console.log("this.formMock",this.formMock)
  }

  buildOptionalsFields=():FormGroup=>{
    return this._fb.group({
      paramValue:[""]
    })
  }

}
