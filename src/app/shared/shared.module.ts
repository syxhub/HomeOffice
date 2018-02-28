import { FirstLoginComponent } from './../subpages/dashboard/first-login/first-login.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from '../layout/toastr.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    AuthService,
    NgbActiveModal,
    ToastrService
  ],
  exports: [
    FormsModule
  ],
  entryComponents: [FirstLoginComponent]
})
export class SharedModule { }
