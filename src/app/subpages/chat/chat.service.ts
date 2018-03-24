import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../../shared/auth/auth.service';
import { DatabaseService } from './../../shared/database/database.service';


@Injectable()
export class ChatService {

  me: string;
  activeChatRoom = new Subject<string>();

  constructor(
    private authService: AuthService,
    private dateBase: DatabaseService
  ) { }

  getActiveChatRoom() {
    return this.activeChatRoom.asObservable();
  }

  getChatRooms() {
    return this.dateBase.getChatRooms();
  }

  getMessages(roomName) {
    return this.dateBase.getMessages(roomName);
  }

  getUsers() {
    return this.dateBase.getUsers();
  }

  getCurrentUser() {
    if (this.me) {
      return this.me;
    } else {
      this.me = this.authService.getCurrentUser().displayName;
      return this.authService.getCurrentUser().displayName;
    }
  }

  sendMessage(message: string, roomName: string) {
    const newMessage = { text: message, sentAt: Date.now(), sentBy: this.getCurrentUser() };
    return this.dateBase.sendMessageToChatRoom(newMessage, roomName);
  }

  setActiveChatRoom(room: string) {
    this.activeChatRoom.next(room);
  }
}
