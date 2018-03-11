import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat.service';

@Component({
  selector: 'ho-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.scss']
})
export class ChatBoardComponent implements OnInit {

  activeChatRoom: Object;
  roomName = '';
  singleText = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getActiveChatRoom()
      .subscribe(room => {
        this.roomName = Object.keys(room)[0];
        this.activeChatRoom = room[this.roomName];
      });
  }

  sendMessage() {
    console.log(this.singleText);
    this.singleText = '';
  }
}
