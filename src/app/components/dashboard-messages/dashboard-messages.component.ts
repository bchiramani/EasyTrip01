import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-messages',
  templateUrl: './dashboard-messages.component.html',
  styleUrls: ['./dashboard-messages.component.css']
})
export class DashboardMessagesComponent implements OnInit {
  messages :any;
  constructor(private messageService: MessageService,  private router:Router) { }

  ngOnInit() {
    this.messageService.sendRequestToGetAllMessages().subscribe(
      (data) => {
        this.messages=data.messages;
        console.log(this.messages);
      }
    );
  }
  deleteMessage(id){
    console.log(id);
    Swal.fire({
      icon: 'error',
      title: 'Do you want to delete this message ?',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.messageService.sendRequestToDeleteMessage(id).subscribe()
        Swal.fire('Deleted!', '', 'success')
      } 
    })
    this.messageService.sendRequestToGetAllMessages().subscribe(
      (data) => {
        this.messages=data.messages;
        console.log(this.messages);
      }
    );
  }
  // displayMessage(id){
  //   Swal.fire({
  //     icon: 'info',
  //     title: 'Do you want to display message ?',
  //     showCancelButton: true,
  //     confirmButtonText: 'Display'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.router.goToPath('message/id');
  //       this.messageService.sendRequestToGetMessageById(id).subscribe()
        
  //     } 
  //   })
    

  // }

}
