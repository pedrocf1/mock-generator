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

  getOptionalsFieldsFormGroupFrom=(formGroup:FormGroup):FormGroup=>{
    return formGroup.get("optionalsFields") as FormGroup
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
  
  initiateFormMock=()=>{
    this.formMock = this._fb.group({
      mockField: this._fb.array([this.buildField()])
    })
  }
  
  getFieldTypes=()=>{
    this.fieldTypes = this._mockSerivece.fieldTypes()
  }

  addField=()=>{
    // console.log("this.mockField", this.mockField.value) // stringfy quando for imprimir pra o usuario
    this.mockField.push(this.buildField())
    console.log("this.mockField", this.mockField)
  }

  buildField=(): FormGroup=>{
    const formGroup=this._fb.group({
      fieldName:["",[Validators.required]],
      fieldType:["",[Validators.required]]
    })
    formGroup.get("fieldType").valueChanges.subscribe(value=>{
      // console.log("this.mockField.value[0]", this.mockField.value[0])
      this.fieldTypeSelection(formGroup, value)
    })
    return formGroup
  }
  
  
  fieldTypeSelection=(formGroup:FormGroup, fieldType:string)=>{
    const formField = this.buildOptionalFields(fieldType)
    if(formField){
      console.log("vou add o optionalsFields", formField)
      formGroup.addControl("optionalsFields", formField)
      formGroup.get("optionalsFields").valueChanges.subscribe(value=>{console.log("ASDSAD",this)})
    }else{
      formGroup.removeControl("optionalsFields")
    }
  }

  buildOptionalFields=(fieldType):FormGroup=>{
    const {funcValidator, validatorType} = MockValidators.getValidator(fieldType)
    let formGroup = null
    console.log("buildOptionalFields funcValidator", funcValidator)
    if(funcValidator==null){
      return null
    }

    if (validatorType == "range") {
      console.log("TYPE RANGE", validatorType)
      formGroup = this._fb.group({
        validatorType:[validatorType],
        minRange:[0],
        maxRange:[0]
      });
      (formGroup as FormGroup).setValidators(funcValidator(Number.MIN_VALUE, Number.MIN_VALUE));
    }
    return formGroup
  } 



  //utils
  
  changeType(i){
    console.log(this.mockField.value[i])
    if (!this.mockField.value[i].fieldType.includes("Range")) {
      delete this.mockField.value[i].optionalsFields
    }
  }

}
