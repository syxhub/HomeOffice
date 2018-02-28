import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScrumBoardComponent } from './scrum-board/scrum-board.component';
import { SubpagesRoutingModule } from './subpages-routing.module';
import { FirstLoginComponent } from './dashboard/first-login/first-login.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ScrumBoardComponent,
    FirstLoginComponent
  ],
  imports: [
    SharedModule,
    SubpagesRoutingModule
  ],
})
export class SubpagesModule { }
