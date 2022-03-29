import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ProvidersService } from 'src/app/services/providers.service';
@Component({
  selector: 'app-signin-service-provider',
  templateUrl: './signin-service-provider.component.html',
  styleUrls: ['./signin-service-provider.component.css']
})
export class SigninServiceProviderComponent implements OnInit {
  signinServiceProviderForm: FormGroup;
  errMessage: string;
  constructor(private fb: FormBuilder,private providerService: ProvidersService, private router: Router) {}

  ngOnInit() {
    console.log("helllo");
    this.signinServiceProviderForm= this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(5)]]
    })
  }
  signin(){
    console.log("user Object ", this.signinServiceProviderForm.value)
    this.providerService.sendRequestToSigninProvider(this.signinServiceProviderForm.value).subscribe( 
      (data)=>{ 
        console.log("signin response from BE",data);
        if(localStorage.getItem('connected')=='true'){
          this.errMessage= "already connected";
        }else if (data.code == '0'){
          localStorage.setItem('connected','false');
          this.errMessage= "email does not exist"
        }else if (data.code == '1'){
          localStorage.setItem('connected','false');
          this.errMessage= "verify your password";
        }else{
          this.errMessage="";
          localStorage.setItem('connected','true');
          console.log(data.serviceProvider);
          localStorage.setItem("connectedUser", (JSON.stringify(data.serviceProvider)||'[]'));
          console.log('connected User from localStorage',JSON.parse(localStorage.getItem('connectedUser')));
          this.router.navigate(['accountServiceProvider']);
        }
        console.log(this.errMessage)
        console.log(data.serviceProvider);
      }
    );

    
  }

}
