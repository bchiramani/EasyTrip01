import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard-admins',
  templateUrl: './dashboard-admins.component.html',
  styleUrls: ['./dashboard-admins.component.css']
})
export class DashboardAdminsComponent implements OnInit {
  addAdminForm:FormGroup;
  errMessage :string;
  admins :any;
  constructor(private router : Router, private adminService : AdminService, private fb:FormBuilder) { }

  ngOnInit() {
    this.adminService.sendRequestToGetAllAdmins().subscribe(
      (data) => {
        this.admins=data.admins;
        console.log(this.admins);
      }
    );
    console.log("hello from add admin")
    this.addAdminForm= this.fb.group({
      firstName : ['',[Validators.required,Validators.minLength(3)]],
      lastName : ['',[Validators.required,Validators.minLength(3)]],
      email : ['',[Validators.required,Validators.email]],
      function : ['',[Validators.required,Validators.minLength(3)]],
      password : ['',[Validators.required,Validators.minLength(5)]],
    })
  }
  addAdmin(){
    console.log(this.addAdminForm.value);
    this.adminService.sendRequestToAddAdmin(this.addAdminForm.value).subscribe(
      (data)=> {
        console.log("adding Admin response from BE",data.code);
        if (data.code == '0'){
          this.errMessage= "email already exists";
        }else{
          this.errMessage="admin added";
          this.router.navigate(['dashboard']);
        }
        console.log(this.errMessage);
      }
    );
  }

}
