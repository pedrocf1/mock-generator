import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.initiateFormMock()
  }

  initiateFormMock=()=>{
    this.buildFormMock()
  }

  buildFormMock=()=>{
    this.formMock = this._fb.group({
      mockField: this._fb.array([this.buildField()])
    })
  }

  buildField=(): FormGroup=>{
    return this._fb.group({
      fieldName:["",[Validators.required]],
      fieldType:["",[Validators.required]],
      optionalsFields: this._fb.array([this.buildOptionalsFields()])
    })
  }

  buildOptionalsFields=():FormGroup=>{
    return this._fb.group({
      intRating:[null],//criar validador aqui que tem na outra branch
      textArray:[null],
      intArray:[null],
      textOnly:[null],
      intOnly:[null]
    })
  }

}
