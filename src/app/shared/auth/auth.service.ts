import { UserToSignUp } from './../../model/user.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@firebase/auth-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  isNavbarCollapsed = true;
  loggedIn = new Subject<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.isLoggedIn();
  }

  signUp(newUser: UserToSignUp) {
    this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .catch(err =>
        console.log(err)
      );
  }

  login(username: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(username, password)
      .then(user => {
        this.loggedIn.next(true);
        this.router.navigate(['dashboard']);
      })
      .catch(err => console.log(err));
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
}
