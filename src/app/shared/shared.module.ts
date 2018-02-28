import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ng2-toastr-notifications';

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
    ToastrService
  ],
  exports: [
    FormsModule
  ]
})
export class SharedModule { }
