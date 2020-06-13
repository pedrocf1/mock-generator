import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MockFormService } from './mock-form.service';
import { FieldType } from './model/fieldType.interface';
import { MockValidators } from './model/mock-validators';


function emailMatcher(c:AbstractControl): ValidationErrors|null{
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

  getOptionalsField(index:number){
    return this.mockField.at(index).get('optionalsFields')
  }

  constructor(private _fb: FormBuilder,
              private _mockSerivece: MockFormService) { }

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
  
  fieldTypeSelection=(formGroup:FormGroup, fieldType:string)=>{
    const formField = this.buildOptionalFields(fieldType)
    if(formField){
      formGroup.addControl("optionalsFields", formField)
    }else{
      formGroup.removeControl("optionalsFields")
    }
    
    console.log("this.formMock",this.formMock)
  }

  buildOptionalFields=(fieldType):FormGroup=>{
    const {funcValidator, validatorType} = MockValidators.getValidator(fieldType)
    let formGroup = null

    if(funcValidator==null){
      return null
    }

    if (validatorType == "range") {
      formGroup = this._fb.group({
        validatorType:[validatorType],
        minRange:[0],
        maxRange:[0]
      },funcValidator)
    }
    
    return formGroup
  }

}
