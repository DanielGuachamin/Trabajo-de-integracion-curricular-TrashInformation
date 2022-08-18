import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  //Módulo para recuperar contraseña

  //Expresión regular que admite dirección de correo válido:
  //letras, números, que contenga una @, un . y termine en algo
  emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Variable para manejo de formulario
  formRecover: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    //Instancia de formulario con sus validaciones
    this.formRecover = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.pattern(this.emailPattern),
      ]),
    });
  }

  //Envía correo de restauración de contraseña y redirige a login
  onSubmit() {
    //Pasa correo con minúsculas
    let email = this.formRecover.get('email').value;
    email = email.toLowerCase();
    this.formRecover.controls['email'].setValue(email);
    this.userService
      .recoverPassword(email)
      .then((response) => {
        this.toastr.info('Verifique su bandeja de correos', 'Correo enviado', {
          positionClass: 'toast-bottom-right',
        });
        console.log('respuesta recuperar: ', response)
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error))
  }

  closeRecoverPassword() {
    this.router.navigate(['/login']);
  }

  //Funcion getter para correo
  get email() {
    return this.formRecover.get('email');
  }

  //Función de retroalimentación cuando se comete errores al completar formulario
  //Se toma en cuenta el campo que sea obligatorio y aplica patrón Regex
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un dirección de correo';
    }
    return this.email.hasError('email')
      ? 'Debe tener al menos 6 caracteres y ser un correo válido'
      : '';
  }
}
