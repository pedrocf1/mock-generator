import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export class MockValidators  {

    // implements ValidationErrors


    static getValidator=(fieldType:string)=>{
        if(fieldType.includes("Range")){
            return {funcValidator:MockValidators.rangeValidator, validatorType:"range"}
        }else{
            return {funcValidator:null, validatorType:null}
        }

    }


    static rangeValidator=(c: AbstractControl): {[key: string]: boolean} | null =>{
        console.log("rangeValidator",c)
        // if (c.value !== null && (isNaN(c.value) || c.value<min || c.value>max)) {
        //     return {'range':true}
        // }
        return null
   }
    

}