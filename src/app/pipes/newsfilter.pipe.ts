import { Pipe, PipeTransform } from '@angular/core';
import { Noticia } from '../modelos/noticia';

@Pipe({
  name: 'newsfilter'
})
export class NewsfilterPipe implements PipeTransform {

  //Filtra las noticias por categoría
  transform(values: Noticia[], arg: String): Noticia[] {
    let noticias: Noticia[] = [];
    for(const value of values){
      if(value.category == arg){
        noticias = [...noticias, value];
      }
    }
    return noticias;
  }

}
