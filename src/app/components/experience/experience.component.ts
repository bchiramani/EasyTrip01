import { Component, Input, OnInit, ɵisListLikeIterable } from '@angular/core';
import { Router } from '@angular/router';
import { ExperienceService } from 'src/app/services/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  @Input() experienceInput :any;
  @Input() path: any;
  constructor(private router: Router,private experienceService: ExperienceService) { }
  btnLikeStyle: string="";
  ngOnInit() {
    console.log("path is" ,this.path);
    console.log(this.experienceInput);
    //this. btnLikeStyle = 'btn-repos'
  }
  

}
