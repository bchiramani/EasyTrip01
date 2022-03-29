import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit {
  signinForm: FormGroup;
  errMessage: string;
  constructor(private fb: FormBuilder,private userService: UserService, private router: Router) {}

  ngOnInit() {
    console.log("helllo");
    this.signinForm= this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(5)]]
    })
  }
  signin(){
    console.log("user Object ", this.signinForm.value)
    this.userService.sendRequestToSignin(this.signinForm.value).subscribe( 
      (data)=>{ 
        console.log("signin response from BE",data.code);
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
          console.log(data.user);
          localStorage.setItem("connectedUser", JSON.stringify(data.user));
          console.log('connected User from localStorage',JSON.parse(localStorage.getItem('connectedUser')||'[]'));
          this.router.navigate(['account']);
        }
        console.log(this.errMessage)
        console.log(data.user);
      }
    );

    
  }

}
