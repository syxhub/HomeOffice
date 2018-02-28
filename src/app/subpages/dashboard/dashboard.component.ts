import { AuthService } from './../../shared/auth/auth.service';
import { FirstLoginComponent } from './first-login/first-login.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ho-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    setTimeout(() => {
      if (!this.authService.isUserNameSet()) {
        this.openFirstLoginModal();
      }
    }, 1000);
  }

  openFirstLoginModal() {
    const modalRef = this.modalService.open(FirstLoginComponent, {
      backdrop: 'static',
      keyboard: false
    });
  }
}
