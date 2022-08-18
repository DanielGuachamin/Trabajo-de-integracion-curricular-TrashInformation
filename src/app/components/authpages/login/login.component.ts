import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataApiService } from 'src/app/services/data-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //Módulo para inicio de sesión

  //Expresión regular que admite dirección de correo válido:
  //letras, números, que contenga una @, un . y termine en algo
  emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Expresión regular para validar contraseña que no admita espacias, use al menos un número,
  //una letras y un caracter especial, minimo 6 caracteres
  passwordPattern: any =
    /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%_#<>*?&])[A-Za-z\d$@$!%_#<>*?&]{6,15}/;

  showPassword: boolean;

  createFormGroup() {
    //Instancia de formulario con sus validaciones
    return new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(this.passwordPattern),
      ]),
    });
  }

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private userControl: DataApiService
  ) {
    //Crea formulario y asigna false a variable showPassword
    this.formLogin = this.createFormGroup();
    this.showPassword = false;
  }

  onSubmit() {
    //No permite iniciar sesión mientras exista errores en los campos de formulario
    if (this.formLogin.valid) {
      let email = this.formLogin.get('email').value;
      email = email.toLowerCase();
      this.formLogin.controls['email'].setValue(email);

      //Pasa un correo con minúsculas e inicia sesión
      this.userService
        .login(this.formLogin.value)
        .then((response: any) => {
          console.log(response);
          this.toastr.success(
            'Ha iniciado sesión exitosamente',
            'Inicio de sesión exitoso',
            {
              positionClass: 'toast-bottom-right',
            }
          );
          //Redirecciona según el rol del usuario
          this.redirectAdminOrUser();
        })
        .catch((error) => {
          //Captura el error y lo paso por un if
          const typeError = error.message;
          console.log(typeError);
          if (typeError.includes('wrong-password')) {
            //Si la contraseña está mal muestra alerta y no permite iniciar sesión
            this.toastr.error(
              'Verifique su contraseña',
              'Contraseña incorrecta',
              {
                positionClass: 'toast-bottom-right',
              }
            );
          } else {
            //Caso contrario indica que el usuario no está registrado y no permite iniciar sesión
            this.toastr.error(
              'Usted no se ha registrado debidamente',
              'Inicio de sesión fallido',
              {
                positionClass: 'toast-bottom-right',
              }
            );
          }
        });
    } else {
      console.log('No funciona');
      this.toastr.error(
        'Complete los campos correctamente',
        'Inicio de sesión fallido',
        {
          positionClass: 'toast-bottom-right',
        }
      );
    }
  }

  //Hace una consulta del rol y redirecciona al dashboard respectivo
  async redirectAdminOrUser() {
    if (this.userService.isAuth()) {
      console.log('si esta autenticado');
      const email = this.formLogin.get('email').value;
      const rol = await this.userControl.searchUserRol(email);

      if (rol === 'admin') {
        this.router.navigate(['/dashboard-admin']);
      } else {
        this.router.navigate(['/dashboard-user']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  seePassword() {
    this.showPassword = !this.showPassword;
  }

  openRegister() {
    this.router.navigate(['/register']);
  }

  openRecover() {
    this.router.navigate(['/recover-password']);
  }

  //Funciones getters para elementos de formulario
  get email() {
    return this.formLogin.get('email');
  }

  get password() {
    return this.formLogin.get('password');
  }

  //Funciones de retroalimentación cuando se comete errores al completar formulario
  //Se toma en cuenta el campo que sea obligatorio y aplica patrones Regex
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un dirección de correo';
    }
    return this.email.hasError('email')
      ? 'Debe tener al menos 6 caracteres y ser un correo válido'
      : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'Debe ingresar una contraseña';
    }
    return this.password.hasError('pattern')
      ? 'Mínimo 6 caracteres, 1 numero, 1 simbolo y sin espacios'
      : '';
  }
}
