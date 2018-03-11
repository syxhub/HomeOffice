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
    private dataBase: DatabaseService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.dataBase.getChatRooms()
    //   .subscribe(chatRooms => {
    //     chatRooms.map(room => this.chatRooms.push(room.key));
    //     this.activeChatRoom = this.chatRooms[0];
    //   });
    // this.dataBase.getMyChatRooms()
    //   .subscribe(chatRooms => {
    //     chatRooms.map(room => console.log(room.key));
    //   });
    // this.dataBase.getUsers()
    //   .subscribe(users => {
    //     Object.keys(users)
    //       .forEach(user =>
    //         this.userList.push(users[user].name)
    //       );
    //   });

    this.http.get('./../../assets/mock/chat.json')
      .subscribe(chatRooms => {
        this.chatRoomData = chatRooms;
      });
    this.myPrivateChats = ['Some User 1', 'Some User 2', 'Some User 3'];
  }

  getRoomName(room: Object) {
    return Object.keys(room);
  }

  setActiveChatRoom(room: Object) {
    this.chatService.setActiveChatRoom(room);
  }
}
