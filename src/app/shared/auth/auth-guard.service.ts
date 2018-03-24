import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.authService.user) {
      return true;
    } else {
      this.authService.user = undefined;
      this.router.navigate(['']);
      return false;
    }
  }
}

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    this.authService.user = undefined;
    if (this.authService.user) {
      this.router.navigate(['dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
