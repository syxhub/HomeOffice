import { Injectable } from '@angular/core';
import { ToastrController } from 'ng2-toastr-notifications';

@Injectable()
export class ToastrService {

  constructor(private toastCtrl: ToastrController) { }

  showToast(type: string, title: string, message: string) {
    this.toastCtrl.show({ type: type, title: title, message: message, position: 'top-right' });
  }
}


