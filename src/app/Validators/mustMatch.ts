import { FormGroup } from "@angular/forms";

export function mustMatch(myString: string, confirmMyString:string){
    return (formGroup : FormGroup)=>{
        const string1 = formGroup.controls[myString];
        const string2 = formGroup.controls[confirmMyString];
        if(string1.value !== string2.value){
            string2.setErrors({mustMatch:true})
        }else{
            string2.setErrors(null);
        }
    }
}
