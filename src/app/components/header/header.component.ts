import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }
  connected: any;
  ngOnInit() {
    this.connected= localStorage.getItem('connected');
    console.log("the connected user is ", this.connected);
  }
  goExperience(){
    this.router.navigate['experiences'];
  }
  logout() {
    localStorage.removeItem('connectedUser');
    localStorage.setItem('connected',"false");
    this.router.navigate['signup'];
  }

}
