import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  serviceProvidersURL: string ="http://localhost:3000/api/serviceProviders";
  constructor(private httpClient: HttpClient) { }
  sendRequestToSignupProvider(serviceProvider,image: File){
    console.log("here service provider into service serviceProvider to signup: ",serviceProvider);
    let formData= new FormData();
    formData.append('name',serviceProvider.name);
    formData.append('email',serviceProvider.email);
    formData.append('type',serviceProvider.type);
    formData.append('password',serviceProvider.password);
    formData.append('image',image);
    return this.httpClient.post<{code : string}>(`${this.serviceProvidersURL}/signup`,formData)
  }
  sendRequestToSigninProvider(serviceProvider){
    console.log("here into service Provider to login: ",serviceProvider);
    return this.httpClient.post<{code : string,serviceProvider:any}>(`${this.serviceProvidersURL}/login`,serviceProvider);
  }
  sendRequestToGetAllServiceProviders(){
    console.log("here request in service to get all service providers");
    return this.httpClient.get<{message : string , serviceProviders: any}>(this.serviceProvidersURL);
  }
  sendRequestToDeleteServiceProvider(id){
    console.log("here service providers Service: delete service provider");
    return this.httpClient.delete<{message : string }>(`${this.serviceProvidersURL}/${id}`)
  }
  }
