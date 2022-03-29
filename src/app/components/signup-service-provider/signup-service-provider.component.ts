import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';
import { mustMatch } from 'src/app/validators/mustMatch';


@Component({
  selector: 'app-signup-service-provider',
  templateUrl: './signup-service-provider.component.html',
  styleUrls: ['./signup-service-provider.component.css']
})
export class SignupServiceProviderComponent implements OnInit {
 
  signupServiceProviderForm :FormGroup;
  errMessage: string;
  imagePreview: string;
  constructor(private fb: FormBuilder,private providersService: ProvidersService, private router: Router) {}

  ngOnInit() {
    console.log("helllo from signup for service provider");
    
    console.log("helllo");
    this.signupServiceProviderForm= this.fb.group({
      name : ['',[Validators.required,Validators.minLength(3)]],
      email : ['',[Validators.required,Validators.email]],
      type : [''],
      image:[''],
      password : ['',[Validators.required,Validators.minLength(5)]],
      confirmPassword : ['',[Validators.required,Validators.minLength(5)]],
    },
    {
      validator: mustMatch('password', 'confirmPassword')
    })
  }
  signupServiceProvider(){
    console.log(this.signupServiceProviderForm.value);
    this.providersService.sendRequestToSignupProvider(this.signupServiceProviderForm.value,this.signupServiceProviderForm.value.image).subscribe(
      (data)=> {
        console.log("signup for Service Provider response from BE",data.code);
        if(localStorage.getItem('connected')=='true'){
          this.errMessage="Already connected"
        }else if (data.code == '0'){
          this.errMessage= "email already exists"
        }else{
          this.errMessage="user added";
          localStorage.setItem('connected','true');
          localStorage.setItem('connectedUser',JSON.stringify(this.signupServiceProviderForm.value||'[]'));
          this.router.navigate(['account']);
        }
        console.log(this.errMessage);
      }
    );
  }
  onImageSelected(event :Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.signupServiceProviderForm.patchValue({image:file});
    this.signupServiceProviderForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload =()=>{
      this.imagePreview =reader.result as string
    };
    reader.readAsDataURL(file);
    
  }


}
