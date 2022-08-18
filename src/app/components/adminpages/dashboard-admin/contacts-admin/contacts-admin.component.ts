import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { Contacto } from 'src/app/modelos/contacto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-contacts-admin',
  templateUrl: './contacts-admin.component.html',
  styleUrls: ['./contacts-admin.component.scss'],
})
export class ContactsAdminComponent implements OnInit, AfterViewInit {

  //Módulo para administrador contactos

  //Arreglo para manejar columnas de tabla
  displayedColumns: string[] = [
    'name',
    'address',
    'phoneNumber',
    'activity',
    'actions',
  ];

  //Instancia de datos para tabla
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;

  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  //Variable para manejo de datos: formulario, enumerar y lista de contactos
  formContact: FormGroup;
  enumContact: number = 0;
  contactos: Contacto[] = [];

  //Expresión regular que permite acentos 'ñ', 'Ñ' y no admite números
  alfabetWithOutSpacePattern: any = /^(?!.*[0-9])[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,}$/;

  //Expresón regular que permite números hasta 10 dígitos
  phoneNumberPattern: any = /^\d{10}$/;

  constructor(
    private dataControl: DataApiService,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {
    //Instancia de formulario con sus validaciones
    this.formContact = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.alfabetWithOutSpacePattern),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.alfabetWithOutSpacePattern),
      ]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(this.phoneNumberPattern),
      ]),
      activity: new FormControl('', [Validators.required]),
    });
  }

  //Al iniciar obtiene una lista de contactos desde la base de datos
  ngOnInit(): void {
    this.dataControl.getContacts().subscribe((contactos) => {
      this.dataSource.data = contactos;
      this.enumContact = contactos.length;
      this.contactos = contactos;
    });
  }

  //Despues de renderizar el componente se instanacia las propiedad del módulo
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Filtro se activa al detectar cambios y busca en la lista de contactos
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Agrega o modifica un contacto dependiendo del id
  async onSubmitAddContact() {
    //Variable que toma id del contacto para modificar si es -1 lo agrega
    const idAdd = this.comprobarId();
    if(idAdd != -1){
      this.dialogService.confirmDialog({
        title: 'Modificar Contacto',
        message: '¿Esta seguro de modificar este contacto?',
        confirmText: 'Sí',
        cancelText: 'No'
      }).subscribe(async res => {
        //Antes de moficiar muestra un modal, si confirma lo modifica
        if(res){
          this.formContact.controls['id'].setValue(idAdd);
          await this.dataControl.addContact(this.formContact.value, idAdd);
          this.toastr.info(
            'El contacto fue modificado con éxito!',
            'Contacto modificado',
            {
              positionClass: 'toast-bottom-right',
            }
          );
        }else{
          console.log('No se ha confirmado la modificación')
        }
      })
    }else{
      //Enumera los contactos, actualiza valor global y agrega un contacto
      this.dataControl.identifiedIdElement('GlobalContactos').then((response) => {
        let idGlobal = response['lastitemContact'];
        idGlobal++;
        const idAdd = `${idGlobal}c`;
        this.toastr.success(
          'El contacto fue registrado con éxito!',
          'Contacto registrado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        const idElement = {lastitemContact: idGlobal};
        this.dataControl.addGlobalIdElement('GlobalContactos', idElement);
        this.formContact.controls['id'].setValue(idAdd);
        this.dataControl.addContact(this.formContact.value, idAdd);
      })
      }
    }

  //Comprueba si un contacto va a ser modificado comparando id de formulario la base dedatos
  comprobarId() {
    const listElement = this.contactos;
    const idBD = listElement.map((item) => item.id);
    const idMod = this.formContact.get('id').value;
    let idAdd;
    for (let item of idBD) {
      if (item == idMod) {
        idAdd = idMod;
        return idAdd
      }
    }
    return -1;
  }
    
  //Elimina contacto y muestra un modal de confirmación
  async deleteContactById(id: any) {
    this.dialogService.confirmDialog({
      title: 'Eliminar contacto',
      message: '¿Esta seguro de eliminar este contacto?',
      confirmText: 'Sí',
      cancelText: 'No'
    }).subscribe(async res => {
      if(res){
        await this.dataControl.deleteElement(id, 'Contactos');
        this.toastr.error(
          'El contacto fue eliminado con éxito',
          'Registro eliminado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.formContact.reset();
      }else{
        console.log('No se ha confirmado la eliminación')
      }
    })
  }

  //Rellena el formulario con información del contacto usando la base de datos y el id
  fillFormContacto(id: any) {
    this.dataControl.modifiedContact(id).then((response: any) => {
      this.formContact.setValue(response);
    });
  }

  clearForm() {
    this.formContact.reset();
  }

  //Funciones getters para elementos de formulario
  get name() {
    return this.formContact.get('name');
  }

  get lastName() {
    return this.formContact.get('lastName');
  }

  get address() {
    return this.formContact.get('address');
  }

  get phoneNumber() {
    return this.formContact.get('phoneNumber');
  }

  get activity() {
    return this.formContact.get('activity');
  }

  //Funciones de retroalimentación cuando se comete errores al completar formulario
  //Se toma en cuenta el campo que sea obligatorio y aplica patrones Regex
  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'Debe completar el campo';
    }
    return this.name.hasError('pattern')
      ? 'Mínimo 3 caracteres y sin numeros'
      : '';
  }

  getErrorMessageAddress() {
    return this.address.hasError('required')
      ? 'Debe escribir su dirrección'
      : '';
  }

  getErrorMessagePhoneNumber() {
    if (this.phoneNumber.hasError('required')) {
      return 'Debe escribir su número de contacto';
    }
    return this.phoneNumber.hasError('pattern')
      ? 'Coloque un número telefónico válido de 10 dígitos'
      : '';
  }

  getErrorMessageActivity() {
    return this.activity.hasError('required')
      ? 'Debe escribir el servicio de reciclaje que oferta'
      : '';
  }
}
