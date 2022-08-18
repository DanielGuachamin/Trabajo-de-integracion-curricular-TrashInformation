import { Component, OnInit} from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Noticia } from 'src/app/modelos/noticia';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-news-user',
  templateUrl: './news-user.component.html',
  styleUrls: ['./news-user.component.scss']
})
export class NewsUserComponent implements OnInit {

  //Módulo para mostrar información en noticias
  //Variable para manejo de datos: lista de noticias, tamaño de fuente y altura de contenedor
  noticias: Noticia[] = [];
  fontSize = 14;
  height = 360;

  constructor(
    private dataControl: DataApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //Al iniciar obtiene una lista de noticias desde la base de datos
    this.dataControl.getNoticias().subscribe((noticias) => {
      this.noticias = noticias;
    });
  }

  //Función para aumenar tamaño de fuente como máximo hasta 19px
  aumentarTexto(){
    if(this.fontSize > 18){
      this.toastr.error(
        'No es posible aumentar el tamaño del texto',
        'Tamaño de texto no válido',
        {
          positionClass: 'toast-bottom-right',
        }
      );
      this.fontSize = 19
      this.height = 410
    } else{
      this.fontSize++;
      this.height = this.height + 8;
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
      this.height = 360
    } else{
      this.fontSize--;
      this.height = this.height - 8;
    }
  }

}
