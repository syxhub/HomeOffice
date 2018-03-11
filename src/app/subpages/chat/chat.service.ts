import { DatabaseService } from './../../shared/database/database.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ChatService {

  activeChatRoom = new Subject<Object>();

  constructor(private dateBase: DatabaseService) { }

  getActiveChatRoom() {
    return this.activeChatRoom.asObservable();
  }

  getMessages(roomName) {
    this.dateBase.getMessages();
  }

  setActiveChatRoom(room: Object) {
    this.activeChatRoom.next(room);
  }

}
