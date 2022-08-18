import { Injectable } from '@angular/core';

//Ambiente de pruebas para funciones de forma independiente
@Injectable()
export class UtilitiesService {
  static addRecommendation(idRec: string){
    const idNuevos = ['1r', '2r', '3r', '4r', '5r', '6r']
    if(idNuevos.includes(idRec)){
      return 'No es posible agregar';
    } else{
      return 'Se puede agregar';
    }
  }

  static modifiedRecommendation(idRec: string){
    const idNuevos = ['1r', '2r', '3r', '4r', '5r', '6r']
    if(idNuevos.includes(idRec)){
      return 'Esto se puede modificar';
    } else{
      return 'No existe el elemento para modificar';
    }
  }

  static deleteRecommendation(idRec: string){
    const idNuevos = ['1r', '4r', '5r', '6r']
    if(!idNuevos.includes(idRec)){
      return 'Esto está eliminado';
    } else{
      return 'No se ha eliminado';
    }
  }

  static userLogged(credentials: any){
    if(credentials){
      return 'Inicio sesion';
    } else{
      return 'No inicio sesión';
    }
  }
}

