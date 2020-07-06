import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export class MockValidators  {

    static getValidator=(fieldType:string)=>{
        if(fieldType.includes("Range")){
            return {funcValidator:MockValidators.rangeValidator, validatorType:"range"}
        }else{
            return {funcValidator:null, validatorType:null}
        }

    }

    static rangeValidator=(min:number, max:number)=>{
        return (c: AbstractControl): {[key: string]: boolean} | null =>{

            if (c.value !== null && (c.get("minRange").value > c.get("maxRange").value)) {
                return {'range':true}
            }
            return null
        }
    }
}