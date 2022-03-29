import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-account-service-provider',
  templateUrl: './account-service-provider.component.html',
  styleUrls: ['./account-service-provider.component.css']
})
export class AccountServiceProviderComponent implements OnInit {
  connected:any;
  connectedUser:any;
  myExperiences:any;
  path:string="accountServiceProvider";
  constructor(private router: Router,private experienceService:ExperienceService) { }

  ngOnInit() {
    this.connected=localStorage.getItem('connected');
    if(this.connected){
      console.log("hello in account service provider component ,you re connected");
      this.connectedUser=JSON.parse(localStorage.getItem('connectedUser')||'[]');
      console.log(this.connectedUser);
    }else{
      console.log("connect before visiting your account")
      this.router.navigate['**'];
    }
    console.log(this.connectedUser.email);
    this.experienceService.sendRequestToGetExperienceByWriterEmail(this.connectedUser.email).subscribe(
      (data) => {
        console.log(data.experiences);
        this.myExperiences=data.experiences;
      }
    );
    console.log(this.myExperiences);
  }

}
