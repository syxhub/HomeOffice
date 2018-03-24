import { Component, Input, OnInit } from '@angular/core';

import { ChatRoom } from '../../../../model/chat.model';

@Component({
  selector: 'ho-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input() roomName: string;

  constructor() { }

  ngOnInit() {
  }

}
