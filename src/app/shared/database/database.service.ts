import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { ChatMessage } from './../../model/chat.model';
import { Task } from '../../model/task.model';


@Injectable()
export class DatabaseService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  createEditor(id: string) {
    const editor = this.db.object('coop-edit/' + id);
    editor.set({ value: '' });
    return editor.valueChanges();
  }

  getEditor(id: string) {
    const editor = this.db.object('coop-edit/' + id);
    return editor.snapshotChanges();
  }

  updateEditorText(id: string, value: string) {
    const editor = this.db.object('coop-edit/' + id);
    editor.set({ value });
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

  getTaskList(uid: string) {
    const taskList = this.db.list('users/' + uid + '/taskList');
    return taskList.snapshotChanges();
  }

  modifyTaskList(uid: string, tasks: Task[]) {
    const taskList = this.db.object('users/' + uid);
    taskList.set({ taskList: tasks });
  }

  sendMessageToChatRoom(message: ChatMessage, roomName: string) {
    const chatRoom = this.db.list('chatDTO/chatHistory/' + roomName + '/messages');
    chatRoom.push(message);
  }
}
