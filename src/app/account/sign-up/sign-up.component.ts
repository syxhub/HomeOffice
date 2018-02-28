import { ToastrService } from './../../layout/toastr.service';
import { Component, OnInit } from '@angular/core';

import { UserToSignUp } from '../../model/user.model';
import { AuthService } from './../../shared/auth/auth.service';

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
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.newUser = new UserToSignUp();
  }

  signUp() {
    if (this.newUser.password === this.passwordAgain) {
      this.authService.signUp(this.newUser);
    } else {
      this.toast.showToast(`warning`, `Registration Failed`, `The passwords must match!`);
    }
  }
}
