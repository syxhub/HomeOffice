import { Injectable } from '@angular/core';


@Injectable()
export class ChatService {

  activeChatRoom: string;

  setActiveChatRoom(roomName: string) {
    this.activeChatRoom = roomName;
  }

}
