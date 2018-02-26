import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule,
  ],
  declarations: [
    LoginComponent,
    SignUpComponent
  ]
})
export class AccountModule { }
