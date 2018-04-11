import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ToastrService } from '../../layout/toastr.service';
import { FirstLoginComponent } from '../../subpages/dashboard/first-login/first-login.component';

@Injectable()
export class AuthService {

  user: BehaviorSubject<firebase.User> = new BehaviorSubject(undefined);

  constructor(
    private afAuth: AngularFireAuth,
    private modalService: NgbModal,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
    afAuth.authState.subscribe(user => {
      this.user.next(user);
    });
  }

  signUp(newUser) {
    this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(() => {
        this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(newUser.email, newUser.password)
          .then(response => {
            this.logout();
            response.user.sendEmailVerification()
              .then(() => {
                this.translate.get(['message.success.registrationSuccess', 'message.success.verificationEmailSent'])
                  .subscribe(messages => {
                    this.toast.showToast(`success`, messages[Object.keys(messages)[0]], messages[Object.keys(messages)[1]]);
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
        setTimeout(() => {
          if (!user.displayName) {
            const modalRef = this.modalService.open(FirstLoginComponent, { backdrop: 'static', keyboard: false })
              .result.then(userName => {
                user.updateProfile({ displayName: userName });
              });
          } else {
            this.translate.get('message.info.welcomeBack', { userName: user.displayName })
              .subscribe(welcome =>
                this.toast.showToast(`info`, ``, welcome));
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

  isLoggedIn() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut();
    this.user.next(undefined);
  }
}
