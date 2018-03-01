import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ChatBoardComponent } from './chat/chat-board/chat-board.component';
import { MessageComponent } from './chat/chat-board/message/message.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { RoomComponent } from './chat/chat-list/room/room.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirstLoginComponent } from './dashboard/first-login/first-login.component';
import { ScrumBoardComponent } from './scrum-board/scrum-board.component';
import { SubpagesRoutingModule } from './subpages-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ScrumBoardComponent,
    FirstLoginComponent,
    ChatComponent,
    ChatListComponent,
    ChatBoardComponent,
    MessageComponent,
    RoomComponent
  ],
  imports: [
    SharedModule,
    SubpagesRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SubpagesModule { }
