import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { tokenNotExpired } from 'angular2-jwt';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ToastrService } from '../../layout/toastr.service';
import { FirstLoginComponent } from '../../subpages/dashboard/first-login/first-login.component';
import { UserToSignUp } from './../../model/user.model';
import { DatabaseService } from './../database/database.service';

@Injectable()
export class AuthService {

  public token: string;
  loggedIn: BehaviorSubject<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private dataBase: DatabaseService,
    private modalService: NgbModal,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    this.token = localStorage.getItem('token');
    this.loggedIn = new BehaviorSubject<boolean>(this.isLoggedInByToken());
  }

  signUp(newUser: UserToSignUp) {
    this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        this.translate.get(['message.success.registrationSuccess', 'message.success.verificationEmailSent'])
          .subscribe(message => {
            this.toast.showToast(`success`, message[Object.keys(message)[0]], message[Object.keys(message)[1]]);
          });
        this.router.navigate(['login']);
      })
      .catch(err => {
        console.log(err);
        this.translate.get('message.alert.registrationFailed').subscribe(failed =>
          this.toast.showToast(`warning`, failed, err)
        );
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.loggedIn.next(true);
        this.router.navigate(['dashboard']);
        this.setToken();
        setTimeout(() => {
          if (!this.isUserNameSet()) {
            const modalRef = this.modalService.open(FirstLoginComponent, { backdrop: 'static', keyboard: false })
              .result.then(userName => {
                this.setUserName(userName);
                this.dataBase.createDatabaseForUser(this.afAuth.auth.currentUser.uid, userName);
              });
          } else {
            const userName = this.getCurrentUser().displayName;
            this.translate.get('message.info.welcomeBack', { userName: userName })
              .subscribe(welcome =>
                this.toast.showToast(`info`, ``, welcome)
              );
          }
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        this.translate.get('message.alert.loginFailed').subscribe(failed =>
          this.toast.showToast(`warning`, failed, err));
      });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.afAuth.auth.signOut();
    this.loggedIn.next(false);
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  isLoggedIn() {
    return this.afAuth.authState;
  }

  isLoggedInByToken() {
    return tokenNotExpired();
  }

  isUserNameSet() {
    return this.getCurrentUser().displayName;
  }

  getToken() {

  }

  setToken() {
    this.afAuth.auth.currentUser.getToken()
      .then(token => {
        this.afAuth.auth.setPersistence('session');
        localStorage.setItem('token', token);
        localStorage.setItem('homeOfficeUser', this.afAuth.auth.currentUser.displayName);
      });
  }

  setUserName(userName: string) {
    this.afAuth.auth.currentUser.updateProfile({ displayName: userName, photoURL: null });
  }
}
