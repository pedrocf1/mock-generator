import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export class MockValidators  {

    static getValidator=(fieldType:string):{funcValidator: Function, validatorType:String}=>{
        if(fieldType.includes("Range")){
            return {funcValidator:MockValidators.rangeValidator, validatorType:"range"}
        }else if(fieldType.includes("Object")){
            console.log("vou retornar a função do objeto")
            return {funcValidator:MockValidators.objectValidator, validatorType:"Object"}
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
    
    static objectValidator=(c: AbstractControl = null): {[key: string]: boolean} | null =>{
            console.log("object validator")
            return null
    }
}