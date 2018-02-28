import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../shared/auth/auth.service';

@Component({
  selector: 'ho-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed = false;
  isLoggedIn;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.loggedIn
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  logout() {
    this.authService.logout();
  }
}
