import * as firebase from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../shared/auth/auth.service';

@Component({
  selector: 'ho-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = true;
  user: firebase.User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.user
    .subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
