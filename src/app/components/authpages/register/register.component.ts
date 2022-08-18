import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ubication } from 'src/app/modelos/ubication';
import { DataApiService } from 'src/app/services/data-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  //Módulo para registro

  //Expresión regular que admite dirección de correo válido:
  //letras, números, que contenga una @, un . y termine en algo
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Expresión regular para validar contraseña que no admita espacias, use al menos un número,
  //una letras y un caracter especial, minimo 6 caracteres
  passwordPattern: any = /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%_#<>*?&])[A-Za-z\d$@$!%_#<>*?&]{6,15}/;

  //Expresión regular que permite acentos, 'ñ', 'Ñ' y no admite números
  alfabetWithOutSpacePattern: any = /^(?!.*[0-9])[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,}$/;

  //Variable para manejo de datos: formulario
  formReg: FormGroup;

  //Instancia de fechas límites de datepicker
  maxDate: Date = new Date('01/01/2005');
  minDate: Date = new Date('01/01/1920');

  showPassword: boolean;

  //Direcciones disponibles en base de datos
  directionsMap: Ubication[] = [
    {
      key: 'alt',
      value: 'ALTAMIRA'
    },
    {
      key: 'batal',
      value: 'BATAN ALTO'
    },
    {
      key: 'bat',
      value: 'BATAN'
    },
    {
      key: 'bel',
      value: 'BELISARIO'
    },
    {
      key: 'chori',
      value: 'CENTRO HISTORICO ORIENTAL'
    },
    {
      key: 'eggo',
      value: 'EL GIRON - GUAPULO'
    },
    {
      key: 'frta',
      value: 'FLORESTA'
    },
    {
      key: 'jpjp',
      value: 'JIPIJAPA'
    },
    {
      key: 'lcom',
      value: 'LA COMUNA'
    },
    {
      key: 'lgsa',
      value: 'LA GASCA'
    },
    {
      key: 'lg',
      value: 'LA GRANJA'
    },
    {
      key: 'lmac',
      value: 'LA MARISCAL'
    },
    {
      key: 'mlsc',
      value: 'MANUEL LARREA - SANTA CLARA'
    },
    {
      key: 'pnclo',
      value: 'PANECILLO'
    },
    {
      key: 'prds',
      value: 'PERIODISTAS'
    },
    {
      key: 'pdra',
      value: 'PRADERA'
    },
    {
      key: 'tmyo',
      value: 'TAMAYO'
    }
  ]

  constructor(
    private userService: UserService,
    private router: Router,
    private dataControl: DataApiService,
    private toastr: ToastrService,
    ) {
    //Instancia de formulario con sus validaciones
    this.formReg = new FormGroup({
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
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.alfabetWithOutSpacePattern)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(this.alfabetWithOutSpacePattern)
      ]),
      direccionBase: new FormControl('', [
        Validators.required
      ]),
      birthdate: new FormControl('', [
        Validators.required
      ]),
      profilePic: new FormControl(''),
      direccion: new FormControl(''),
      rol: new FormControl('cliente')
    })
    this.showPassword = false;
  }

  //Registro de usuario y redirecciona usuario a login
  onSubmit(){
    this.userService.register(this.formReg.get('email').value, this.formReg.get('password').value)
      .then(async response => {
        this.toastr.success(
          'Se ha registro con éxito',
          'Registro exitoso',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        //Elimina contraseña del formulario
        this.formReg.removeControl('password');

        //Inserta fecha con formato en específico
        const getDate = this.getDate()

        //Obtiene imagen generada con url mediante una API
        const getPick = this.getPickAPI()

        //Busca en el objeto de direcciones y relaciona clave-valor
        const keyDirection = this.formReg.get('direccionBase').value
        const valueDirection = this.getValueDirection(keyDirection)

        //Almacena todos los datos procesados en el formulario
        this.formReg.controls['birthdate'].setValue(getDate)
        this.formReg.controls['profilePic'].setValue(getPick)
        this.formReg.controls['direccion'].setValue(valueDirection)
        let email = this.formReg.get('email').value
        email = email.toLowerCase()
        this.formReg.controls['email'].setValue(email)

        //Guarda en la base de datos de Firebase
        await this.dataControl.addUser(this.formReg.value, email)
        this.router.navigate(['/login']);
      })
      .catch(error => {
        //El error ocurre cuando se quiere registrar un correo previamente guardado
        console.error(error)
        this.toastr.error(
          'Ya existe una persona registrada con este correo',
          'Registro fallido',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      });
      
  }

  //Hace consulta del objeto de direcciones y retorna nombre de dirección
  getValueDirection(key: string): String{
    let value
    for(let item of this.directionsMap){
      if(item.key === key){
        value = item.value
        return value;
      }
    }
    return value;
  }

  //Transforma fecha a formato requerido AAAA/MM/DD
  getDate(){
    let momentResponse = this.formReg.value
    momentResponse = JSON.parse(JSON.stringify(momentResponse))
    momentResponse = momentResponse.birthdate
    momentResponse = momentResponse.slice(0,-14)
    let split = momentResponse.split('-')
    momentResponse = split[2] + '/' + split[1] + '/' + split[0]
    return momentResponse
  }

  //Retorna URL generada para consumir API de imagenes con nombre y apellido
  getPickAPI(){
    const formName = this.formReg.get('name').value;
    const formLastName = this.formReg.get('lastName').value
    let urlPick = `https://ui-avatars.com/api/?background=0B2460&color=fff&size=600&font-size=0.4&name=${formName}+${formLastName}`
    return urlPick
  }
    
  seePassword(){
    this.showPassword = !this.showPassword
  }

  closeRegister() {
    this.router.navigate(['/login']);
  }

  //Funciones getters para elementos de formulario
  get email(){
    return this.formReg.get('email');
  }

  get password(){
    return this.formReg.get('password');
  }

  get name(){
    return this.formReg.get('name');
  }

  get lastName(){
    return this.formReg.get('lastName');
  }

  get direccionBase(){
    return this.formReg.get('direccionBase');
  }

  get birthdate(){
    return this.formReg.get('birthdate');
  }

  //Funciones de retroalimentación cuando se comete errores al completar formulario
  //Se toma en cuenta el campo que sea obligatorio y aplica patrones Regex
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un dirección de correo';
    }
    return this.email.hasError('email') ? 'Debe tener al menos 6 caracteres y ser un correo válido' : '';
  }

  getErrorMessagePassword(){
    if (this.password.hasError('required')) {
      return 'Debe ingresar una contraseña'
    }
    return this.password.hasError('pattern') ? 'Mínimo 6 caracteres, 1 numero, 1 simbolo y sin espacios' : '';
  }

  getErrorMessageNameLastname(){
    if (this.name.hasError('required')) {
      return 'Debe completar el campo'
    }
    return this.name.hasError('pattern') ? 'Mínimo 3 caracteres, sin numeros y sin espacios' : '';
  }

  getErrorMessageDirection(){
    return this.direccionBase.hasError('required') ? 'Debe seleccionar un sector de domicilio' : '';
  }

  getErrorMessageBirthday(){
    return this.birthdate.hasError('required') ? 'Debe seleccionar una fecha de nacimiento' : '';
  }

}