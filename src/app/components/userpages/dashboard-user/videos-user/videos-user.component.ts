import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Video } from 'src/app/modelos/video';

@Component({
  selector: 'app-videos-user',
  templateUrl: './videos-user.component.html',
  styleUrls: ['./videos-user.component.scss']
})
export class VideosUserComponent implements OnInit {

  //Módulo para mostrar información en noticias
 
  //Variable para manejo de datos: lista de videos
  videos: Video[] = [];

  constructor(private dataControl: DataApiService) { }

  ngOnInit(): void {
    //Al iniciar obtiene una lista de videos desde la base de datos
    this.dataControl.getVideos().subscribe((videos) => {
      this.videos = videos;
    });
  }

}
