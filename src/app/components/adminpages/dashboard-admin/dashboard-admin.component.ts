import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent {

  //Módulo para administrador header de administrador

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
    ) { }

  //Permite cerrar sesión redirigiendo a la pantalla de login e indica alerta de dicha acción
  singOut(){
    this.userService.logout()
      .then(() => {
        this.toastr.success('Usted ha cerrado sesión exitosamente', 'Cierre de Sesión', {
          positionClass: 'toast-bottom-right',
        });
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

 
}
