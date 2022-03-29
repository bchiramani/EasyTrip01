import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {
  experienceForm: FormGroup;
  errMessage: string;
  connected :any;
  connectedUser:any;
  id:any;
  experience:any;
  title : any="Add Your Experience";
  imagePreview : string;
  constructor(private fb: FormBuilder,private experienceService: ExperienceService, private router: Router,private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.connected=localStorage.getItem('connected');
    this.connectedUser=JSON.parse(localStorage.getItem('connectedUser')||'[]');
    if(this.connected){
      console.log("hello in add experience component ,you re connected");
    }else{
      console.log("connect before adding your experience")
      this.router.navigate['signin'];
    }
    
    this.id=this.activatedRoute.snapshot.paramMap.get('experience');
    if(this.experience != null){
      // this.experienceService.sendRequestToGetExperienceById(this.experience.id).subscribe(
      //   (data) => {
      //     console.log("component edit",data.experience);
      //     this.experience=data.experience;
      //   });
      this.title=' Edit Your Experience';
      this.experienceForm=this.experience;
      console.log("experience form :", this.experienceForm);
    }
    this.experienceForm= this.fb.group({
      title : ['',[Validators.required,Validators.minLength(3)]],
      destination : ['',[Validators.required,Validators.minLength(3)]],
      description : ['',[Validators.required,Validators.email]],
      images : [''],
      writer:['']
    })



 
    
  }
  addExperience(){
    console.log(this.experienceForm.value);

    if (this.id) {
      console.log("edit experience", this.id);
      this.experienceService.sendRequestToEditExperience(this.experienceForm.value).subscribe(
        (data)=>{
          console.log(data.message);
        }
      );
      this.router.navigate(['account']); 
    }else{
      this.experienceForm.value.writer=this.connectedUser.email;
      this.experienceService.sendRequestToAddExperience(this.experienceForm.value,this.experienceForm.value.images).subscribe(
        (data)=>{
          console.log(data.code);
          if (data.code == '0'){
            this.errMessage= "a problem has occured"
          }else{
            this.errMessage="your experience is added successfully"
          }
        }
      );
      this.router.navigate(['account']);
    }
  }
  onImageSelected(event :Event){
    const file=(event.target as HTMLInputElement).files[0];
    this.experienceForm.patchValue({images:file});
    this.experienceForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload =()=>{
      this.imagePreview =reader.result as string
    };
    reader.readAsDataURL(file);
    
  }


}
