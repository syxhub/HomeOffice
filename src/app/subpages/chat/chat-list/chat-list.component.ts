import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../../shared/database/database.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'ho-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  myChannels = new Array<string>();
  chatRooms = new Array<string>();
  userList = new Array<string>();

  activeChatRoom: string;

  constructor(
    private chatService: ChatService,
    private dataBase: DatabaseService
  ) { }

  ngOnInit() {
    this.dataBase.getChatRooms()
      .subscribe(chatRooms => {
        chatRooms.map(room => this.chatRooms.push(room.key));
        this.activeChatRoom = this.chatRooms[0];
      });
    this.dataBase.getMyChatRooms()
      .subscribe(chatRooms => {
        chatRooms.map(room => console.log(room.key));
      });
    this.dataBase.getUsers()
      .subscribe(users => {
        Object.keys(users)
          .forEach(user =>
            this.userList.push(users[user].name)
          );
      });
  }

  setActiveChatRoom(roomName: string) {
    this.chatService.setActiveChatRoom(roomName);
  }
}
