import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { Sugerencia } from 'src/app/modelos/sugerencia';
import { DialogService } from 'src/app/services/dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suggestions-admin',
  templateUrl: './suggestions-admin.component.html',
  styleUrls: ['./suggestions-admin.component.scss'],
})
export class SuggestionsAdminComponent implements OnInit {

  //Módulo para administrador sugerencias

  //Variable para manejo de datos: formulario, enumerar y lista de sugerencias
  formSuggest: FormGroup;
  sugerencias: Sugerencia[] = [];

  constructor(
    private dataControl: DataApiService,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {
    //Instancia de formulario con sus validaciones
    this.formSuggest = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      section: new FormControl('', [
        Validators.required
      ]),
      comment: new FormControl('', [
        Validators.required
      ]),
    });
  }

  ngOnInit(): void {
    //Al iniciar obtiene una lista de sugerencias desde la base de datos
    this.dataControl.getSuggestions().subscribe((sugerencias) => {
      this.sugerencias = sugerencias;
    });
  }

  //Elimina sugerencia y muestra un modal de confirmación
  async deleteSuggestById(id: any) {
    this.dialogService.confirmDialog({
      title: 'Eliminar sugerencia',
      message: '¿Esta seguro de eliminar esta sugerencia?',
      confirmText: 'Sí',
      cancelText: 'No'
    }).subscribe(async res => {
      if(res){
        await this.dataControl.deleteElement(id, 'Sugerencias');
        this.toastr.error(
          'La sugerencia fue eliminada con éxito!',
          'Sugerencia eliminada',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      }else{
        console.log('No se ha confirmado la eliminación')
      }
    })
  }

  //Funciones getters para elementos de formulario
  get section(){
    return this.formSuggest.get('section');
  }

  get comment(){
    return this.formSuggest.get('comment');
  }

  //Crea una url usando nombre y apellido del usuario para generar imagen con API
  recuperarUrlImage(name: String, lastName: String){
    return `https://ui-avatars.com/api/?background=0B2460&color=fff&size=600&font-size=0.4&name=${name}+${lastName}`
  }

}
