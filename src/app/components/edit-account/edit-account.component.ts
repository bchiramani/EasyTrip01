import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/user.service';
import { mustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  editForm :any;
  connectedUser:any;
  constructor(private fb : FormBuilder, private userService: UserService,private router:Router) { }

  ngOnInit() {
    this.connectedUser=JSON.parse(localStorage.getItem('connectedUser')||'[]');
    console.log('connectedUser', this.connectedUser);
    
    this.editForm= this.fb.group({
      firstName : ['', [Validators.required,Validators.minLength(3)]],
      lastName : ['',[Validators.required,Validators.minLength(3)]],
      email : ['',[Validators.required,Validators.email]],
      age : [''],
      country :['',[Validators.required,Validators.minLength(3)]],
      bio:[''],
      password : ['',[Validators.required,Validators.minLength(5)]],
      confirmPassword : ['',[Validators.required,Validators.minLength(5)]],
    },
    {
      validator: mustMatch('password', 'confirmPassword')
    })
    //this.editForm=connectedUser;
  }
  save(){
    this.userService.sendRequestToEditUser(this.editForm);
    
    this.router.navigate['account']

  }

}
