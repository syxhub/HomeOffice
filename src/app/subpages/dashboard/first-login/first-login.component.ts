import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../../layout/toastr.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ho-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  userName: string;

  constructor(
    public activeModal: NgbActiveModal,
    private toast: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.userName = '';
  }

  trimUserName() {
    this.userName = this.userName.replace(/\s/g, '');
  }

  setUserName() {
    if (this.userName.replace(/\s/g, '') !== '') {
      this.activeModal.close(this.userName.replace(/\s/g, ''));
    } else {
      this.translate.get(['message.alert.usernameInvalid', 'message.alert.usernameEmpty'])
      .subscribe(messages => {
        this.toast.showToast(`success`, messages[Object.keys(messages)[0]], messages[Object.keys(messages)[1]]);
      });
    }
  }
}
