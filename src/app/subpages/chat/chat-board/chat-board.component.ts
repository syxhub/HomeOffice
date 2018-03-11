import { Component, OnInit } from '@angular/core';

import { ChatService } from '../chat.service';

@Component({
  selector: 'ho-chat-board',
  templateUrl: './chat-board.component.html',
  styleUrls: ['./chat-board.component.scss']
})
export class ChatBoardComponent implements OnInit {

  activeChatRoom: string;
  singleText = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.getActiveChatRoom()
      .subscribe(chatRoom => {
        this.activeChatRoom = chatRoom;
      });
      this.chatService.getMessages(this.activeChatRoom);
  }

  getMessages() {

  }

  sendMessage() {
    console.log(this.singleText);
    this.singleText = '';
  }
}
