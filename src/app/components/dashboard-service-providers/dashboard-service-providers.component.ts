import { Component, OnInit } from '@angular/core';
import { ProvidersService } from 'src/app/services/providers.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-service-providers',
  templateUrl: './dashboard-service-providers.component.html',
  styleUrls: ['./dashboard-service-providers.component.css']
})
export class DashboardServiceProvidersComponent implements OnInit {
  users :any;
  serviceProviders:any;
  constructor(private providersService : ProvidersService,  private router:Router) { }

  ngOnInit() {
    
    this.providersService.sendRequestToGetAllServiceProviders().subscribe(
      (data) => {
        this.serviceProviders=data.serviceProviders;
        console.log(this.serviceProviders);
      }
    );
  }
  deleteServiceProvider(id){
    console.log(id);
    Swal.fire({
      icon: 'error',
      title: 'Do you want to delete user ?',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.providersService.sendRequestToDeleteServiceProvider(id).subscribe()
        Swal.fire('Deleted!', '', 'success')
      } 
    })
    this.providersService.sendRequestToGetAllServiceProviders().subscribe(
      (data) => {
        this.serviceProviders=data.serviceProviders;
        console.log(this.serviceProviders);
      }
    );
  }
  displayServiceProvider(id){
    Swal.fire({
      icon: 'info',
      title: 'Do you want to display user ?',
      showCancelButton: true,
      confirmButtonText: 'Display'
    }).then((result) => {
      if (result.isConfirmed) {
        //this.goToPath('serviceProviders/id');
        //this.userService.sendRequestToGetUserById(id).subscribe()
        
      } 
    })
    

  }

}
