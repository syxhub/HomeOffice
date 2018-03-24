import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat.service';
import { ChatMessage, ChatRoom } from './../../../model/chat.model';

@Component({
  selector: 'ho-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.scss']
})
export class ChatBoardComponent implements OnInit {

  chatRoomData: ChatRoom;
  messages = new Array<ChatMessage>();
  roomName = '';
  singleText = '';
  me: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getActiveChatRoom()
      .subscribe(room => {
        this.roomName = room;
        this.chatService.getMessages(room)
          .subscribe(messages => {
            this.messages = [];
            messages.map(message => {
              this.messages.push(message.payload.val());
            });
          });
      });
    this.me = this.chatService.getCurrentUser();
  }

  sendMessage() {
    this.chatService.sendMessage(this.singleText, this.roomName);
    this.singleText = '';
  }
}
