import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';

import { ToastrService } from '../../layout/toastr.service';
import { UserToSignUp } from './../../model/user.model';

@Injectable()
export class AuthService {

  isNavbarCollapsed = true;
  loggedIn = new Subject<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toast: ToastrService
  ) {
    this.isLoggedIn();
  }

  signUp(newUser: UserToSignUp) {
    this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        this.toast.showToast(`success`, `Registration Successful`, `A verification email has been sent to the given email address.`);
        this.router.navigate(['login']);
      })
      .catch(err => {
        console.log(err);
        this.toast.showToast(`warning`, `Registration Failed`, err);
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.loggedIn.next(true);
        this.router.navigate(['dashboard']);
      })
      .catch(err => {
        console.log(err);
        this.toast.showToast(`warning`, `Login Failed`, err);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.loggedIn.next(false);
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  isLoggedIn() {
    return this.afAuth.authState;
  }

  isUserNameSet() {
    return this.getCurrentUser().displayName;
  }

  setUserName(userName: string) {
    this.afAuth.auth.currentUser.updateProfile({displayName: userName, photoURL: null});
  }
}
