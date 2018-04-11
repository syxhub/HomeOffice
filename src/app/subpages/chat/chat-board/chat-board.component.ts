import { AuthService } from './../../../shared/auth/auth.service';
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

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) { }

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
    this.authService.user
      .subscribe(user => {
        this.me = user.displayName;
      });
  }

  sendMessage() {
    if (this.singleText.trim() !== '') {
      this.chatService.sendMessage(this.singleText, this.roomName, this.me);
    }
    this.singleText = '';
  }
}
