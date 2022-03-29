import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(experiences :any,searchKey :any): any {
    if(searchKey ===undefined){
      return experiences;
    }
    return experiences.filter((element)=>{
      return (element.title.toLowerCase.include(searchKey.toLowerCase))||(element.destination.toLowerCase.include(searchKey.toLowerCase))||(element.description.toLowerCase.include(searchKey.toLowerCase))
    }) ; 

  }

}
