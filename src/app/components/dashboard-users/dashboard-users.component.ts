import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrls: ['./dashboard-users.component.css']
})
export class DashboardUsersComponent implements OnInit {
  users :any;
  serviceProviders:any;
  constructor(private userService: UserService,  private router:Router) { }

  ngOnInit() {
    this.userService.sendRequestToGetAllUsers().subscribe(
      (data) => {
        this.users=data.users;
        console.log(this.users);
      }
    );
  }
  delete(id){
    console.log(id);
    Swal.fire({
      icon: 'error',
      title: 'Do you want to delete user ?',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.sendRequestToDeleteUser(id).subscribe()
        Swal.fire('Deleted!', '', 'success')
      } 
    })
    this.userService.sendRequestToGetAllUsers().subscribe(
      (data) => {
        this.users=data.users;
        console.log(this.users);
      }
    );
  }
  display(id){
    Swal.fire({
      icon: 'info',
      title: 'Do you want to display user ?',
      showCancelButton: true,
      confirmButtonText: 'Display'
    }).then((result) => {
      if (result.isConfirmed) {
        //this.router.goToPath('user/id');
        //this.userService.sendRequestToGetUserById(id).subscribe()
        
      } 
    })
    

  }

}
