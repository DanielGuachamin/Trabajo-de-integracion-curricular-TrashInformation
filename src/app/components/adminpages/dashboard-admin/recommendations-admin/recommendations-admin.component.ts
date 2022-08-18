import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { Recomendacion } from 'src/app/modelos/recomendacion';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-recommendations-admin',
  templateUrl: './recommendations-admin.component.html',
  styleUrls: ['./recommendations-admin.component.scss'],
})
export class RecommendationsAdminComponent implements OnInit {

  //Módulo para administrador recomendaciones

  //Variable para manejo de datos: formulario, enumerar y lista de recomendaciones
  formRecomen: FormGroup;
  enumRecomen: number = 0;
  recomendaciones: Recomendacion[] = [];

  //Expresión regular que admite hasta 150 caracteres
  contentLimitPattern: any = /^[\s\S]{0,150}$/;

  //Imagenes de plantilla para cargar cuando un administrador no sube una url personalizada
  plantillaImage: any = {
    MedioAmbiente:
      'https://user-images.githubusercontent.com/66534512/182672307-7fc94945-b9e8-46a2-8dfe-f122e577decc.jpg',
    Orgánicos:
      'https://user-images.githubusercontent.com/66534512/182672297-12434858-6467-478d-87bb-ade29790a1a4.jpg',
    Reciclaje:
      'https://user-images.githubusercontent.com/66534512/182672301-11e18541-4a07-404c-a747-a55d27401b8a.jpg',
    Covid19:
      'https://user-images.githubusercontent.com/66534512/182672305-b004430f-48b6-4cc8-963c-61f23ae76289.jpg',
  };

  constructor(
    private dataControl: DataApiService,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {
    //Instancia de formulario con sus validaciones
    this.formRecomen = new FormGroup({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      content: new FormControl('', [
        Validators.required,
        Validators.pattern(this.contentLimitPattern),
      ]),
      urlImage: new FormControl(),
      id: new FormControl(),
    });
  }

  //Al iniciar obtiene una lista de recomendaciones desde la base de datos
  ngOnInit(): void {
    this.dataControl.getRecommendations().subscribe((recomendaciones) => {
      this.recomendaciones = recomendaciones;
      this.enumRecomen = recomendaciones.length;
    });
  }

  //Agrega o modifica una recomendación dependiendo del id
  async onSubmitAddRecomen() {

    //Si el campo de url es nulo, asigna una imagen de plantilla al campo de formulario respectivo
    const urlImage = this.formRecomen.get('urlImage').value;
    if (!urlImage) {
      const baseImages = this.plantillaImage;
      const category = this.formRecomen.get('category').value;
      for (let nameImage in baseImages) {
        if (nameImage == category) {
          const responseUrlImage = baseImages[nameImage];
          this.formRecomen.controls['urlImage'].setValue(responseUrlImage);
        }
      }
    }

    //Variable que toma id del contacto para modificar si es -1 lo agrega
    const idAdd = this.comprobarId();
    if (idAdd != -1) {
      this.dialogService.confirmDialog({
        title: 'Modificar Recomendación',
        message: '¿Esta seguro de modificar esta recomendación?',
        confirmText: 'Sí',
        cancelText: 'No'
      }).subscribe(async res => {
        //Antes de moficiar muestra un modal, si confirma lo modifica
        if(res){
          this.formRecomen.controls['id'].setValue(idAdd);
          await this.dataControl.addRecommendation(this.formRecomen.value, idAdd);
          this.toastr.info(
            'La recomendación fue modificada con éxito!',
            'Recomendación modificada',
            {
              positionClass: 'toast-bottom-right',
            }
          );
        }else{
          console.log('No se ha confirmado la modificación')
        }
      })
    } else {
      //Enumera las recomendaciones, actualiza valor global y agrega una recomendación
      this.dataControl
        .identifiedIdElement('GlobalRecomendation')
        .then((response) => {
          let idGlobal = response['lastitemRecomendation'];
          idGlobal++;
          const idAdd = `${idGlobal}r`;
          this.toastr.success(
            'La recomendación fue registrada con éxito!',
            'Recomendación registrada',
            {
              positionClass: 'toast-bottom-right',
            }
          );
          const idElement = { lastitemRecomendation: idGlobal };
          this.dataControl.addGlobalIdElement('GlobalRecomendation', idElement);
          this.formRecomen.controls['id'].setValue(idAdd);
          this.dataControl.addRecommendation(this.formRecomen.value, idAdd);
          console.log('formulario a enviar: ', this.formRecomen.value);
        });
    }
  }

  //Comprueba si una recomendación va a ser modificado comparando id de formulario con la base de datos
  comprobarId() {
    const listElement = this.recomendaciones;
    const idBD = listElement.map((item) => item.id);
    const idMod = this.formRecomen.get('id').value;
    let idAdd;
    for (let item of idBD) {
      if (item == idMod) {
        idAdd = idMod;
        return idAdd;
      }
    }
    return -1;
  }

  //Elimina una recomendcación y muestra un modal de confirmación
  async deleteRecomenById(id: any) {
    this.dialogService.confirmDialog({
      title: 'Eliminar recomendación',
      message: '¿Esta seguro de eliminar esta recomendación?',
      confirmText: 'Sí',
      cancelText: 'No'
    }).subscribe(async res =>{
      if(res){
        await this.dataControl.deleteElement(id, 'Recomendaciones');
        this.toastr.error(
          'La recomendación fue eliminada con éxito!',
          'Recomendación eliminada',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.formRecomen.reset();
      }else{
        console.log('No se ha confirmado la eliminación')
      }
    })
   
  }

  //Rellena el formulario con información de la recomendación usando la base de datos y el id
  fillFormRecomen(id: any) {
    this.dataControl.modifiedRecommendation(id).then((response: any) => {
      this.formRecomen.setValue(response);
    });
  }

  clearForm() {
    this.formRecomen.reset();
  }

  //Funciones getters para elementos de formulario
  get title() {
    return this.formRecomen.get('title');
  }

  get category() {
    return this.formRecomen.get('category');
  }

  get content() {
    return this.formRecomen.get('content');
  }

  //Funciones de retroalimentación cuando se comete errores al completar formulario
  //Se toma en cuenta el campo que sea obligatorio y aplica patrones Regex
  getErrorMessageTitle() {
    return this.title.hasError('required')
      ? 'Debe escribir un título para la recomendación'
      : '';
  }

  getErrorMessageCategory() {
    return this.category.hasError('required')
      ? 'Debe elegir una categoría para la recomendación'
      : '';
  }

  getErrorMessageContent() {
    if (this.content.hasError('required')) {
      return 'Debe escribir el contenido de su recomendación';
    }
    return this.content.hasError('pattern')
      ? 'Límite máximo de caracteres es 150'
      : '';
  }
}
