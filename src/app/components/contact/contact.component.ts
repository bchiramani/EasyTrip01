import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: MessageService) { }

  ngOnInit() {
    console.log("helllo");
    this.contactForm= this.fb.group({
      firstName : ['',[Validators.required,Validators.minLength(3)]],
      lastName : ['',[Validators.required,Validators.minLength(3)]],
      email : ['',[Validators.required,Validators.email]],
      content : ['',[Validators.required,Validators.minLength(3)]]
    });
    
  }
  sendMessage(){
    console.log(this.contactForm.value);
    this.userService.sendRequestToAddMessage(this.contactForm.value).subscribe();
  }

}
