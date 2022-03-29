import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProvidersService } from 'src/app/services/providers.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users :any;
  serviceProviders:any;
  constructor(private userService: UserService,private providersService : ProvidersService,  private router:Router) { }

  ngOnInit() {
    
  }
  
  
  goToPath(arg0: string) {
    throw new Error('Method not implemented.');
  }

}
