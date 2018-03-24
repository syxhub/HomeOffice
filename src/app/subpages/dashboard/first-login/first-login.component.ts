import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from '../../../layout/toastr.service';

@Component({
  selector: 'ho-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  userName: string;

  constructor(
    public activeModal: NgbActiveModal,
    private toast: ToastrService
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
      this.toast.showToast(`warning`, `Invalid username`, `Your username cannot be empty or contain only spaces!`);
    }
  }
}
