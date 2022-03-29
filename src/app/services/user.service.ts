import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string ="http://localhost:3000/api/users";
  constructor(private httpClient: HttpClient) { }

  sendRequestToSignup(user:any,image: File){
    console.log("here user into service user to signup: ",user);
    let formData= new FormData();
    formData.append('firstName',user.firstName);
    formData.append('lastName',user.lastName);
    formData.append('email',user.email);
    formData.append('age',user.age);
    formData.append('country',user.country);
    formData.append('password',user.password);
    formData.append('image',image);
    console.log(user);
    return this.httpClient.post<{code : string}>(`${this.userURL}/signup`,formData)

  }
  sendRequestToSignin(user:any){
    console.log("here into service user to login: ",user);
    
    return this.httpClient.post<{code : string,user:any}>(`${this.userURL}/login`,user);
  }
  sendRequestToEditUser(user){
    console.log("here into service user to edit user",user);
    return this.httpClient.patch<{code : string,user:any}>(`${this.userURL}/edit`,user);
  }
  sendRequestToGetAllUsers(){
    console.log("here request in service to get all users");
    return this.httpClient.get<{message : string , users: any}>(this.userURL);
  }
  sendRequestToDeleteUser(id){
    console.log("here UsersService: delete user");
    return this.httpClient.delete<{message : string }>(`${this.userURL}/${id}`)
  }
  sendRequestToGetUserById(id){
    
  }
}
