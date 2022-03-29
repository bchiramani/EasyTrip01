import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminURL: string ="http://localhost:3000/api/admins";
  constructor(private httpClient: HttpClient) { }

  sendRequestToAddAdmin(admin){
    console.log("here user into service admin to add admin: ",admin);
    return this.httpClient.post<{code : string}>(`${this.adminURL}/addAdmin`,admin)

  }
  sendRequestToGetAllAdmins(){
    console.log("here request in service to get all admins");
    return this.httpClient.get<{message : string , admins: any}>(this.adminURL);
  }
}
