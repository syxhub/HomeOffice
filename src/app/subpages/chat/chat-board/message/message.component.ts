import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ho-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() messageText: string;

  constructor() { }

  ngOnInit() {
  }

}
