import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { ToastrService } from '../layout/toastr.service';
import { FirstLoginComponent } from './../subpages/dashboard/first-login/first-login.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { DatabaseService } from './database/database.service';

@NgModule({
  imports: [
    FormsModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    AuthService,
    DatabaseService,
    NgbActiveModal,
    ToastrService
  ],
  exports: [
    FormsModule,
    TranslateModule
  ],
  entryComponents: [FirstLoginComponent]
})
export class SharedModule { }
