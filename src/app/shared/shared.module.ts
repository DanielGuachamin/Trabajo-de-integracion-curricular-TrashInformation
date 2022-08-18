import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsfilterPipe } from 'src/app/pipes/newsfilter.pipe';
import { VideosfilterPipe } from 'src/app/pipes/videosfilter.pipe';
import { RecomensfilterPipe } from 'src/app/pipes/recomensfilter.pipe';
import { ConfirmComponent } from '../components/dialogs/confirm/confirm.component';
import { MaterialModule } from '../material.module';

//Modulo para generalizar modulos en toda la aplicación

@NgModule({
  declarations: [
    NewsfilterPipe,
    VideosfilterPipe,
    RecomensfilterPipe,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    NewsfilterPipe,
    VideosfilterPipe,
    RecomensfilterPipe
  ]
})
export class SharedModule { }
