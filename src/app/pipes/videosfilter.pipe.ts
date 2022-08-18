import { Pipe, PipeTransform } from '@angular/core';
import { Video } from '../modelos/video';

@Pipe({
  name: 'videosfilter'
})
export class VideosfilterPipe implements PipeTransform {

  //Filtra los videos por categoría
  transform(values: Video[], arg: String): Video[] {
    let videos: Video[] = [];
    for(const value of values){
      if(value.category == arg){
        videos = [...videos, value];
      }
    }
    return videos;
  }

}
