import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
} from '@angular/fire/storage';
import { Noticia } from 'src/app/modelos/noticia';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.scss'],
})
export class NewsAdminComponent implements OnInit {

  //Módulo para administrador noticias

  //Variable para manejo de datos: formulario, enumerar, lista de noticias, url de imagen y detectar imagen
  formNoticia: FormGroup;
  enumNoticias: number = 0;
  noticias: Noticia[] = [];
  urlNoticia: any = null;
  selectedFile: any = null;

  //Expresón regular que permite hasta 380 caracteres
  contentLimitPattern: any = /^[\s\S]{0,380}$/;

  //Imagenes de plantilla para cargar cuando un administrador no sube una imagen personalizada
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
    private storage: Storage,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {
    //Instancia de formulario con sus validaciones
    this.formNoticia = new FormGroup({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern(this.contentLimitPattern)
      ]),
      author: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      id: new FormControl(),
      noticiaPic: new FormControl(''),
    });
  }

  ngOnInit(): void {
    //Al iniciar obtiene una lista de noticias desde la base de datos
    this.dataControl.getNoticias().subscribe((noticias) => {
      this.noticias = noticias;
      this.enumNoticias = noticias.length;
    });
  }

  //Agrega o modifica un contacto dependiendo del id
  async onSubmitAddNoticia() {
    const urlNoticia = this.urlNoticia;
    //Variable que toma id del contacto para modificar si es -1 lo agrega
    const idAdd = this.comprobarId();
    if (idAdd != -1) {
      this.dialogService
        .confirmDialog({
          title: 'Modificar Noticia',
          message: '¿Esta seguro de modificar esta noticia?',
          confirmText: 'Sí',
          cancelText: 'No',
        })
        .subscribe(async (res) => {
          //Antes de moficiar muestra un modal, si confirma lo modifica
          if (res) {
            //Si una imagen ha sido cargada inserta la url en el formulario
            if (urlNoticia) {
              this.formNoticia.controls['noticiaPic'].setValue(urlNoticia);
            }
            this.formNoticia.controls['id'].setValue(idAdd);
            await this.dataControl.addNoticia(this.formNoticia.value, idAdd);
            console.log(this.formNoticia.value);
            this.formNoticia.reset();
            this.selectedFile = null;
            this.urlNoticia = '';
            this.toastr.info(
              'La noticia fue modificada con éxito!',
              'Noticia modificado',
              {
                positionClass: 'toast-bottom-right',
              }
            );
          } else {
            console.log('No se ha confirmado la modificación');
          }
        });
    } else {
      this.dataControl.identifiedIdElement('GlobalNews').then((response) => {
        //Si una imagen ha sido carga inserta la url en el formulario
        //Caso contrario inserta una imagen de plantilla de acuerdo a la categoría
        if (urlNoticia) {
          this.formNoticia.controls['noticiaPic'].setValue(urlNoticia);
        } else {
          const baseImages = this.plantillaImage;
          const category = this.formNoticia.get('category').value;
          for (let nameImage in baseImages) {
            if (nameImage == category) {
              const responseUrlImage = baseImages[nameImage];
              this.formNoticia.controls['noticiaPic'].setValue(
                responseUrlImage
              );
            }
          }
          
        }
        //Enumera las noticias, actualiza valor global y agrega una noticia
        let idGlobal = response['lastitemNew'];
        idGlobal++;
        const idAdd = `${idGlobal}n`;
        const idElement = { lastitemNew: idGlobal };
        this.dataControl.addGlobalIdElement('GlobalNews', idElement);
        this.formNoticia.controls['id'].setValue(idAdd);
        this.dataControl.addNoticia(this.formNoticia.value, idAdd);
        console.log('formulario a enviar: ', this.formNoticia.value);
        this.formNoticia.reset();
        this.selectedFile = null;
        this.urlNoticia = '';
        this.toastr.success(
          'La noticia fue registrada con exito!',
          'Noticia registrada',
          {
            positionClass: 'toast-bottom-right',
          }
        );
      });
    }
  }

  comprobarId() {
    //Comprueba si una noticia va a ser modificado comparando id de formulario con la base de datos
    const listElement = this.noticias;
    const idBD = listElement.map((item) => item.id);
    const idMod = this.formNoticia.get('id').value;
    let idAdd;
    for (let item of idBD) {
      if (item == idMod) {
        idAdd = idMod;
        return idAdd;
      }
    }
    return -1;
  }

  //Elimina noticia y muestra un modal de confirmación
  async deleteNoticiaById(id: any) {
    this.dialogService
      .confirmDialog({
        title: 'Eliminar noticia',
        message: '¿Esta seguro de eliminar esta noticia?',
        confirmText: 'Sí',
        cancelText: 'No',
      })
      .subscribe(async (res) => {
        if (res) {
          await this.dataControl.deleteElement(id, 'Noticias');
          this.toastr.error(
            'La noticia fue eliminada con éxito!',
            'Noticia eliminada',
            {
              positionClass: 'toast-bottom-right',
            }
          );
          this.formNoticia.reset();
        } else {
          console.log('No se ha confirmado la eliminación');
        }
      });
  }

  //Carga una imagen mediante Firebase Storage
  uploadNoticiaImage($event: any) {
    this.selectedFile = $event.target.files[0] ?? null;
    const file = $event.target.files[0];
    const imgRef = ref(this.storage, `noticiasImages/${file.name}`);
    uploadBytes(imgRef, file)
      .then((response) => {
        console.log(response);
        //Llama a la función y pasa el nombre de ruta de la imagen
        this.getNoticiaImageUrl(`noticiasImages/${file.name}`);
      })
      .catch((error) => console.log(error));
  }

  //Obtiene la url de la imagen y la guarda en la propiedad urlNoticia
  getNoticiaImageUrl(path: string) {
    getDownloadURL(ref(this.storage, path)).then((url) => {
      this.toastr.success('Ahora ya puedes agregar una noticia', 'Imagen cargada', {
        positionClass: 'toast-bottom-right',
      });
      this.urlNoticia = url;
    });
  }

  //Rellena el formulario con información de la noticia usando la base de datos y el id
  fillFormNoticia(id: any) {
    this.dataControl.modifiedNoticia(id).then((response: any) => {
      this.formNoticia.setValue(response);
    });
  }

  clearForm() {
    this.selectedFile = null;
    this.urlNoticia = '';
    this.formNoticia.reset();
  }

  //Funciones getters para elementos de formulario
  get title() {
    return this.formNoticia.get('title');
  }

  get category() {
    return this.formNoticia.get('category');
  }

  get description() {
    return this.formNoticia.get('description');
  }

  get author() {
    return this.formNoticia.get('author');
  }

  get url() {
    return this.formNoticia.get('url');
  }

  //Funciones de retroalimentación cuando se comete errores al completar formulario
  //Se toma en cuenta el campo que sea obligatorio y aplica patrones Regex
  
  getErrorMessageTitle() {
    return this.title.hasError('required')
      ? 'Debe escribir un título para la noticia'
      : '';
  }

  getErrorMessageCategory() {
    return this.category.hasError('required')
      ? 'Debe elegir una categoría para la noticia'
      : '';
  }

  getErrorMessageDescription() {
    if (this.description.hasError('required')) {
      return 'Debe escribir la recomendación de la noticia';
    }
    return this.description.hasError('pattern')
      ? 'Límite máximo de caracteres es 380'
      : '';
  }

  getErrorMessageAuthor() {
    return this.author.hasError('required')
      ? 'Debe escribir un autor para la noticia'
      : '';
  }

  getErrorMessageUrl() {
    return this.url.hasError('required')
      ? 'Debe ingresar la fuente bibliográfica donde se encuentra la noticia'
      : '';
  }
}
