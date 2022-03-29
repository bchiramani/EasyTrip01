import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  connected:any;
  connectedUser:any;
  myExperiences:any;
  path:string="account";
  constructor(private router: Router,private experienceService:ExperienceService) { }

  ngOnInit() {
    this.connected=localStorage.getItem('connected');
    if(this.connected=="true"){
      console.log("hello in account component ,you re connected");
      this.connectedUser=JSON.parse(localStorage.getItem('connectedUser')||'[]');
      console.log(this.connectedUser);
      console.log(this.connectedUser.email);
      
    }else{
      console.log("connect before visiting your account")
      this.router.navigate['signup'];
    }
    this.experienceService.sendRequestToGetExperienceByWriterEmail(this.connectedUser.email).subscribe(
      (data) => {
        console.log(data.experiences);
        this.myExperiences=data.experiences;
      }
    );
    console.log(this.myExperiences);
   
  }

  like(id){
    console.log("I like the post ",id);
    // console.log(this.experienceInput._id);
    // let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
    // let myReq: any={id:this.experienceInput.id,email:connectedUser.email};
    // this.experienceService.sendRequestToLikePost(myReq);
    //this.experienceService.getExperienceById(this.path).subscribe
  } 
  edit(experience){
    console.log("I edit the post ",experience);
    this.router.navigate([`addExperience/${experience}`]);
  }
  delete(id){
    console.log("I delete the post ",id);
    this.experienceService.sendRequestToDeleteExperience(id).subscribe(
      (data)=>{
        console.log("request to delete experience",data.message );
      }
    );
    this.experienceService.sendRequestToGetExperienceByWriterEmail(this.connectedUser.email).subscribe(
      (data) => {
        console.log(data.experiences);
        this.myExperiences=data.experiences;
      }
    );
  }

}
