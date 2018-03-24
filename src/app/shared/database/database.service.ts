import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { ChatMessage } from './../../model/chat.model';


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
    const chatRooms = this.db.list('chatDTO/rooms');
    return chatRooms.snapshotChanges();
  }

  getUsers() {
    const users = this.db.list('chatDTO/users');
    return users.snapshotChanges();
  }

  getMessages(roomName: string) {
    const messages = this.db.list(`chatDTO/chatHistory/` + roomName + '/messages');
    return messages.snapshotChanges();
  }

  getMyChatRooms() {
    const chatRooms = this.db.list('chat/rooms');
    return chatRooms.snapshotChanges();
  }

  sendMessageToChatRoom(message: ChatMessage, roomName: string) {
    const chatRoom = this.db.list('chatDTO/chatHistory/' + roomName + '/messages');
    chatRoom.push(message);
  }
}
