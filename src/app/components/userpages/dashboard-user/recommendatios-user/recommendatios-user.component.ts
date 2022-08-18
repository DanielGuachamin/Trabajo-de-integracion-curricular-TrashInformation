import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Recomendacion} from 'src/app/modelos/recomendacion'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recommendatios-user',
  templateUrl: './recommendatios-user.component.html',
  styleUrls: ['./recommendatios-user.component.scss']
})
export class RecommendatiosUserComponent implements OnInit {

  //Módulo para mostrar información en noticias
 
  //Variable para manejo de datos: lista de recomendaciones y tamaño de fuente
  recomendaciones: Recomendacion[] = [];
  fontSize = 14;

  constructor(
    private dataControl: DataApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //Al iniciar obtiene una lista de recomendaciones desde la base de datos
    this.dataControl.getRecommendations().subscribe((recomendaciones) => {
      this.recomendaciones = recomendaciones;
    });
  }

  //Función para aumenar tamaño de fuente como máximo hasta 22px
  aumentarTexto(){
    if(this.fontSize > 21){
      this.toastr.error(
        'No es posible aumentar el tamaño del texto',
        'Tamaño de texto no válido',
        {
          positionClass: 'toast-bottom-right',
        }
      );
      this.fontSize = 22
    } else{
      this.fontSize++;
    }
  }

  //Función para disminuir tamaño de fuente como mínimo hasta 14px
  reducirTexto(){
    if(this.fontSize < 15){
      this.toastr.error(
        'No es posible reducir el tamaño del texto',
        'Tamaño de texto no válido',
        {
          positionClass: 'toast-bottom-right',
        }
      );
      this.fontSize = 14
    } else{
      this.fontSize--;
    }
  }

}
