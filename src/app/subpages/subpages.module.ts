import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ChatBoardComponent } from './chat/chat-board/chat-board.component';
import { MessageComponent } from './chat/chat-board/message/message.component';
import { ChatListComponent } from './chat/chat-list/chat-list.component';
import { RoomComponent } from './chat/chat-list/room/room.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './chat/chat.service';
import { YoutubeComponent } from './dashboard/components/youtube/youtube.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirstLoginComponent } from './dashboard/first-login/first-login.component';
import { ScrumBoardComponent } from './scrum-board/scrum-board.component';
import { SubpagesRoutingModule } from './subpages-routing.module';
import { TaskManagerComponent } from './dashboard/components/task-manager/task-manager.component';
import { TaskComponent } from './dashboard/components/task-manager/task/task.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ScrumBoardComponent,
    FirstLoginComponent,
    ChatComponent,
    ChatListComponent,
    ChatBoardComponent,
    MessageComponent,
    RoomComponent,
    YoutubeComponent,
    TaskManagerComponent,
    TaskComponent
  ],
  imports: [
    SharedModule,
    SubpagesRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ChatService
  ]
})
export class SubpagesModule { }
