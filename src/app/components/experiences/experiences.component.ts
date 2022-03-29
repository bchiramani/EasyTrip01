import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent implements OnInit {
  experiences: any;
  path:String = 'experiences';
  searchByWriterForm :FormGroup;
  myExperiences:any;
  pageOfItems :Array<any>;
  constructor(private experienceService: ExperienceService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.experienceService.sendRequestToGetAllExperiences().subscribe(
      (data) => {
        this.experiences=data.experiences;
        console.log(this.experiences);
      }
    );
    
    this.searchByWriterForm= this.fb.group({
      writerName : ['']
    })
  }
  addExperience(){
    this.router.navigate(['addExperience']);
    
  }
  searchByWriterName(){
    console.log(this.searchByWriterForm.value.writerName);
    this.experienceService.sendRequestToGetExperienceByWriterName(this.searchByWriterForm.value.writerName).subscribe(
      (data) => {
        console.log(data.experiences);
        this.myExperiences=data.experiences;
      }
    );
  }
  search(){

  }


  like(id){
    console.log("I like the post ",id);
    // console.log(this.experienceInput._id);
    // let connectedUser=JSON.parse(localStorage.getItem("connectedUser"));
    // let myReq: any={id:this.experienceInput.id,email:connectedUser.email};
    // this.experienceService.sendRequestToLikePost(myReq);
    //this.experienceService.getExperienceById(this.path).subscribe
  } 
  edit(id){
    console.log("I edit the post ",id);
    this.router.navigate([`addExperience/${id}`]);
    //this.router.navigate(['addExperience']);
  }
  delete(id){
    console.log("I delete the post ",id);
    this.experienceService.sendRequestToDeleteExperience(id).subscribe(
      (data)=>{
        console.log("request to delete experience",data.message );
      }
    );
    this.router.navigate(['account']);
  }
  onChangePage(pageOfItems :Array<any>){
    //update current page of items 
    this.pageOfItems=pageOfItems;
  }

}
