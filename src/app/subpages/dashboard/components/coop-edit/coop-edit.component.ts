import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ho-coop-edit',
  templateUrl: './coop-edit.component.html',
  styleUrls: ['./coop-edit.component.scss']
})
export class CoopEditComponent implements OnInit {

  id = '';

  constructor() { }

  ngOnInit() {
  }

  copyIdToClipboard() {
    const element = document.createElement('textarea');
    element.value = this.id;
    document.body.appendChild(element);
    element.focus();
    element.setSelectionRange(0, element.value.length);
    document.execCommand('copy');
    document.body.removeChild(element);
  }

}
