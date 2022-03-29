import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { mustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit {
  signupForm: FormGroup;
  errMessage: string;
  imagePreview: string;
  constructor(private fb: FormBuilder,private userService: UserService, private router: Router) {}

  ngOnInit() {
    console.log("hello from signup for simple user")
    this.signupForm= this.fb.group({
      firstName : ['',[Validators.required,Validators.minLength(3)]],
      lastName : ['',[Validators.required,Validators.minLength(3)]],
      email : ['',[Validators.required,Validators.email]],
      age : [''],
      country :['',[Validators.required,Validators.minLength(3)]],
      image:[''],
      password : ['',[Validators.required,Validators.minLength(5)]],
      confirmPassword : ['',[Validators.required,Validators.minLength(5)]],
    },
    {
      validator: mustMatch('password', 'confirmPassword')
    });
  }

  signup(){
    console.log(this.signupForm.value);
    this.userService.sendRequestToSignup(this.signupForm.value,this.signupForm.value.image).subscribe(
      (data)=> {
        console.log("signup for Service Provider response from BE",data.code);
        if(localStorage.getItem('connected')=='true'){
          this.errMessage="you are already connected"
        }
        if (data.code == '0'){
          this.errMessage= "email already exists"
        }else{
          this.errMessage="user added";
          localStorage.setItem('connected','true');
          localStorage.setItem('connectedUser',JSON.stringify((this.signupForm.value)||'[]'));
          this.router.navigate(['account']);
        }
        console.log(this.errMessage);
      }
    );
  }
  onImageSelected(event :Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({image:file});
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload =()=>{
      this.imagePreview =reader.result as string
    };
    reader.readAsDataURL(file);

    
  }

}
