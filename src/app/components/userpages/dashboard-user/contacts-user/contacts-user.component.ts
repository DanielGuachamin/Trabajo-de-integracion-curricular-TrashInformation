import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { Contacto } from 'src/app/modelos/contacto'
import { MatDialog} from '@angular/material/dialog'
import { MapComponent} from '../../../dialogs/map/map.component'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contacts-user',
  templateUrl: './contacts-user.component.html',
  styleUrls: ['./contacts-user.component.scss']
})
export class ContactsUserComponent implements OnInit {

  //Módulo para mostrar información en inicio
  //Variable para manejo de datos: lista de contactos y url de perfil de usuario
  contactos: Contacto[] = [];
  urlProfilePicExternally: String;

  constructor(
    private userService: UserService,
    private dataControl: DataApiService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    //Al iniciar obtiene una lista de contactos desde la base de datos
    this.dataControl.getContacts().subscribe((contactos) => {
      this.contactos = contactos;
    });
    //Obtiene información del usuario que ha iniciado sesión
    this.getProfileUser()
  }

  //Obtiene la imagen del usuario,
  //Si la ha modificado cambiará también el logo del header,
  getProfileUser() {
    const email = this.userService.seeEmailUserAuth();
    this.dataControl.getProfile(email).then((response: any) => {
      const profilePic = response.profilePic
      this.dataControl.setImage(profilePic)
    });
  }

  //Controla el díalogo que se ha establecido para el mapa en el directorio de dialogs
  openDialog(){
    const dialogRef = this.dialog.open(MapComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}
