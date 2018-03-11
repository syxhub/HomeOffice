import { DatabaseService } from './../../shared/database/database.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ChatService {

  activeChatRoom = new Subject<string>();

  constructor(private dateBase: DatabaseService) { }

  getActiveChatRoom() {
    return this.activeChatRoom.asObservable();
  }

  getMessages(roomName) {
    this.dateBase.getMessages();
  }

  setActiveChatRoom(roomName: string) {
    this.activeChatRoom.next(roomName);
  }

}
