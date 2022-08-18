import { Pipe, PipeTransform } from '@angular/core';
import { Recomendacion } from '../modelos/recomendacion';

@Pipe({
  name: 'recomensfilter'
})
export class RecomensfilterPipe implements PipeTransform {

  //Filtra las recomendaciones por categoría
  transform(values: Recomendacion[], arg: String): Recomendacion[] {
    let recomendaciones: Recomendacion[] = [];
    for(const value of values){
      if(value.category == arg){
        recomendaciones = [...recomendaciones, value];
      }
    }
    return recomendaciones;
  }

}
