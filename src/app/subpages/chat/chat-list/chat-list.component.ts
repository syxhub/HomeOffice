import { Component, OnInit } from '@angular/core';
import { ChatRoom } from '../../../model/chat.model';

@Component({
  selector: 'ho-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

  // chatRooms: Array<ChatRoom>;
  chatRooms;

  constructor() { }

  ngOnInit() {
    this.chatRooms = [0, 1, 2, 3];
  }

}
