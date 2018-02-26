import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { SubpagesModule } from './subpages/subpages.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    AccountModule,
    AppRoutingModule,
    BrowserModule,
    NgbModule.forRoot(),
    SharedModule,
    SubpagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
