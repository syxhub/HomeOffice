import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    AuthService
  ],
  exports: [
    FormsModule
  ]
})
export class SharedModule { }
