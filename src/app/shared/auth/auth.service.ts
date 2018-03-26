import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { ToastrService } from '../../layout/toastr.service';
import { FirstLoginComponent } from '../../subpages/dashboard/first-login/first-login.component';
import { UserToSignUp } from './../../model/user.model';
import { DatabaseService } from './../database/database.service';

@Injectable()
export class AuthService {

  public token: string;
  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private database: DatabaseService,
    private modalService: NgbModal,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    this.user = afAuth.authState;
    this.token = localStorage.getItem('token');
  }


  signUp(newUser: UserToSignUp) {
    this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        this.translate.get(['message.success.registrationSuccess', 'message.success.verificationEmailSent'])
          .subscribe(message => {
            this.toast.showToast(`success`, message[Object.keys(message)[0]], message[Object.keys(message)[1]]);
          });
        this.router.navigate(['']);
      })
      .catch(err => {
        console.log(err);
        this.translate.get('message.alert.registrationFailed')
          .subscribe(failed =>
            this.toast.showToast(`warning`, failed, err)
          );
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.user = user;
        this.router.navigate(['dashboard']);
        this.setToken();
        setTimeout(() => {
          if (!this.isUserNameSet()) {
            const modalRef = this.modalService.open(FirstLoginComponent, { backdrop: 'static', keyboard: false })
              .result.then(userName => {
                this.setUserName(userName);
                this.database.createDatabaseForUser(this.afAuth.auth.currentUser.uid, userName);
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
        this.translate.get('message.alert.loginFailed')
          .subscribe(failed =>
            this.toast.showToast(`warning`, failed, err));
      });
  }

  logout() {
    this.token = null;
    this.user = undefined;
    localStorage.removeItem('token');
    this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  isUserNameSet() {
    return this.getCurrentUser().displayName;
  }

  setToken() {
    this.afAuth.auth.currentUser.getIdToken()
      .then(token => {
        this.afAuth.auth.setPersistence('session');
        localStorage.setItem('token', token);
        localStorage.setItem('homeOfficeUser', this.afAuth.auth.currentUser.displayName);
      });
  }

  setUserName(userName: string) {
    this.afAuth.auth.currentUser
      .updateProfile({ displayName: userName, photoURL: null });
  }
}
