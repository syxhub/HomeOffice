import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { AuthService } from '../../shared/auth/auth.service';
import { DatabaseService } from './../../shared/database/database.service';


@Injectable()
export class ChatService {

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

  sendMessage(text: string, roomName: string, sentBy: string) {
    const newMessage = { text, sentAt: Date.now(), sentBy};
    return this.dateBase.sendMessageToChatRoom(newMessage, roomName);
  }

  setActiveChatRoom(room: string) {
    this.activeChatRoom.next(room);
  }
}
