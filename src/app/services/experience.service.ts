import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  experienceURL: string ="http://localhost:3000/api/experiences";

  constructor(private httpClient: HttpClient) { }
  sendRequestToAddExperience(experience: any,images :File){
    console.log("here request in service to add an experience: ",experience);
    let formData= new FormData();
    formData.append('title',experience.title)
    formData.append('destination',experience.destination)
    formData.append('description',experience.description)
    formData.append('writer',experience.writer)
    formData.append('images',images)

    return this.httpClient.post<{code : string}>(`${this.experienceURL}/addExperience`,formData)
  }
  
  sendRequestToGetAllExperiences(){
    console.log("here request in service to get all experiences");
    return this.httpClient.get<{message : string , experiences: any}>(this.experienceURL);
  }
  sendRequestToGetExperienceById(id){
    console.log("here request in service to get experience by id");
    return this.httpClient.get<{message : string , experience: any}>(`${this.experienceURL}/${id}`);
  }

  sendRequestToGetExperienceByWriterEmail(writerEmail){
    console.log("here request in service to get experience by writer email",writerEmail);
    return this.httpClient.get<{message : string , experiences: any}>(`${this.experienceURL}/writerEmail/${writerEmail}`);
  }
  sendRequestToGetExperienceByWriterName(writerName){
    console.log("here request in service to get experience by writer name",writerName);
    return this.httpClient.get<{message : string , experiences: any}>(`${this.experienceURL}/writerName/${writerName}`);
  }

  sendRequestToEditExperience(obj:any){
    console.log("here experience service :edit experience ");
    return this.httpClient.put<{message : string}>(`${this.experienceURL}/${obj._id}`,obj)
  }
 
  sendRequestToDeleteExperience(id){
    console.log("here ExperienceService: delete experience");
    return this.httpClient.delete<{message : string }>(`${this.experienceURL}/${id}`)
  }
  sendRequestToLikePost(myReq){
    console.log("here experience service :like experience ");
    return this.httpClient.patch<{message : string}>(`${this.experienceURL}/like/${myReq.id}`,myReq);
  }
  sendRequestToCommentPost(){}
 
}
