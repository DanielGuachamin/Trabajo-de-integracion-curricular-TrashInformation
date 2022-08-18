import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../components/dialogs/confirm/confirm.component';
import { ConfirmDialogData } from '../modelos/confirm-dialog-data';

@Injectable({
  providedIn: 'root'
})

export class DialogService {

  constructor(private dialog: MatDialog) { }

  //Dialogo que funciona como observable de confirmación y se detiene al elegir una opción
  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog.open(ConfirmComponent, {
      data,
      width: '400px',
      disableClose: true
    }).afterClosed();
  }
}
