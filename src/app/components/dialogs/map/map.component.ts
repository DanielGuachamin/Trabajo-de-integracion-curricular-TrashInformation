import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  //Inyecta la dependecia del conjunto de datos para un diálogo a modo de interfaz
  //Diálogo específico para indicaciones sobre mapa
  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    @Inject(MAT_DIALOG_DATA) public message: String
  ) { }

  ngOnInit(): void {
  }

 

}
