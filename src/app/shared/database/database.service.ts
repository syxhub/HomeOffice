import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from 'firebase/app';

import { ChatMessage, ChatRoom } from './../../model/chat.model';


@Injectable()
export class DatabaseService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  createDatabaseForUser(uid: string, userName: string) {
    const user = this.db.object('users/' + uid);
    user.set({ name: userName });
  }

  deleteUser(uid: string) {
    const user = this.db.object('users/' + uid);
    user.remove();
  }

  getChatRooms() {
    const chatRooms = this.db.list('chat/rooms');
    return chatRooms.snapshotChanges();
  }

  getMyChatRooms() {
    const chatRooms = this.db.list('chat/rooms');
    return chatRooms.snapshotChanges();
  }

  getUsersForChat() {
    const users = this.db.object('users/');
    return users.valueChanges();
  }


  sendMessageToChatRoom(message: ChatMessage, room: ChatRoom) {
    const chatRoom = this.db.list('chat/rooms/' + room.name + '/messages');
    chatRoom.push({ text: message.text, sentAt: Date.now(), sentBy: message.sender });
  }

}
