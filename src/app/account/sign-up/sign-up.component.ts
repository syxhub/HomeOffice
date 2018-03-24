import { ToastrService } from './../../layout/toastr.service';
import { Component, OnInit } from '@angular/core';

import { UserToSignUp } from '../../model/user.model';
import { AuthService } from './../../shared/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ho-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  newUser: UserToSignUp;
  passwordAgain: string;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.newUser = new UserToSignUp();
  }

  signUp() {
    if (this.newUser.password === this.passwordAgain) {
      this.authService.signUp(this.newUser);
    } else {
      this.translate.get(['message.alert.registrationFailed', 'message.alert.passwordsNotMatch'])
        .subscribe(message =>
          this.toast.showToast(`warning`, message[Object.keys(message)[0]], message[Object.keys(message)[1]]));
    }
  }
}
