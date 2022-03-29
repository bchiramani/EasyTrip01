import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageURL: string ="http://localhost:3000/api/messages";
  constructor(private httpClient: HttpClient) { }
  sendRequestToAddMessage(message){
    console.log("here msg into service Message: ",message);
    return this.httpClient.post(`${this.messageURL}`,message)
  }
  sendRequestToGetAllMessages(){
    console.log("here request in service to get all messages");
    return this.httpClient.get<{messages :any , message: string}>(this.messageURL);

  }
  sendRequestToDeleteMessage(id){
    console.log("here Messages Service: delete message");
    return this.httpClient.delete<{messages : string }>(`${this.messageURL}/${id}`)
  }

}
