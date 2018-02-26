import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ScrumBoardComponent } from './scrum-board/scrum-board.component';
import { SubpagesRoutingModule } from './subpages-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ScrumBoardComponent
  ],
  imports: [
    SharedModule,
    SubpagesRoutingModule
  ],
})
export class SubpagesModule { }
