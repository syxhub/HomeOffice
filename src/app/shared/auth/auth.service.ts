import { Subject } from 'rxjs/Subject';
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
  user: Subject<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private database: DatabaseService,
    private modalService: NgbModal,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    afAuth.authState.subscribe(user => {
      this.user = new Subject();
      this.user.next(user);
    });
    this.token = localStorage.getItem('token');
  }

  signUp(newUser: UserToSignUp) {
    this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(newUser.email, newUser.password)
          .then(response => {
            response.user.sendEmailVerification()
              .then(() => {
                this.translate.get(['message.success.registrationSuccess', 'message.success.verificationEmailSent'])
                  .subscribe(messages => {
                    this.toast.showToast(`success`, messages[Object.keys(messages)[0]], messages[Object.keys(messages)[1]]);
                    this.logout();
                    this.router.navigate(['']);
                  });
              });
          });
      })
      .catch(err => {
        this.translate.get('message.alert.registrationFailed')
          .subscribe(failed =>
            this.toast.showToast(`warning`, failed, err)
          );
      });
  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.user.next(user);
        this.router.navigate(['dashboard']);
        this.setToken();
        setTimeout(() => {
          if (!user.displayName) {
            const modalRef = this.modalService.open(FirstLoginComponent, { backdrop: 'static', keyboard: false })
              .result.then(userName => {
                user.updateProfile({ displayName: userName });
              });
          } else {
            this.translate.get('message.info.welcomeBack', { userName: user.displayName })
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
    this.user.next(null);
    localStorage.removeItem('token');
    this.afAuth.auth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.authState;
  }

  setToken() {
    this.afAuth.auth.currentUser.getIdToken()
      .then(token => {
        this.afAuth.auth.setPersistence('session');
        localStorage.setItem('token', token);
        localStorage.setItem('homeOfficeUser', this.afAuth.auth.currentUser.displayName);
      });
  }
}
