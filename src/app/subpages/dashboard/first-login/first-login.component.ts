import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
  selector: 'ho-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.scss']
})
export class FirstLoginComponent implements OnInit {

  userName: string;

  constructor(
    private authService: AuthService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  setUserName() {
    this.authService.setUserName(this.userName);
    this.activeModal.close();
  }

}
