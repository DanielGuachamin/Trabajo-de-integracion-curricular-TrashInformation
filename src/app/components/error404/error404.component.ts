import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {
  message: String;

  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    const type = this.rutaActiva.snapshot.params['type'];
    this.comprobarError(type);
  }

  //De acuerdo al tipo de error de ruta cambia el mensaje a presentar en página 404
  comprobarError(type: String){
    console.log(type);
    if (type == 'NoAuth'){
      this.message = '¡No está autenticado!'
    } if (type == 'NoAdmin'){
      this.message = '¡No tiene permiso de administrador!'
    } if (type == 'NoClient'){
      this.message = '¡No tiene permiso de cliente final!'
    }
  }

}
