import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../../shared/database/database.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'ho-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  myPrivateChats = new Array<string>();
  myChatRooms = new Array<string>();
  chatRooms = new Array<string>();
  userList = new Array<string>();

  activeChatRoom: string;
  chatRoomData: any;

  constructor(
    private chatService: ChatService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.chatService.getChatRooms()
      .subscribe(chatRooms => {
        chatRooms.map(room => {
          this.chatRooms.push(room.payload.val());
        });
      });
    this.chatService.getUsers()
      .subscribe(users => {
        this.userList = [];
        users.map(user => {
          this.userList.push(user.payload.val());
        });
      });
    // this.dataBase.getMyChatRooms()
    //   .subscribe(chatRooms => {
    //     chatRooms.map(room => console.log(room.key));
    //   });
  }

  setActiveChatRoom(room: string) {
    this.activeChatRoom = room;
    this.chatService.setActiveChatRoom(room);
  }
}
