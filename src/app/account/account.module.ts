import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  imports: [
    AccountRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SignUpComponent
  ]
})
export class AccountModule { }
