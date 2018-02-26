import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrumBoardComponent } from './scrum-board/scrum-board.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'scrum-board', component: ScrumBoardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubpagesRoutingModule { }
