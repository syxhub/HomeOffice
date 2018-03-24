import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

import { Task } from '../../../../../model/task.model';

@Component({
  selector: 'ho-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  viewProviders: [DragulaService],
  animations: [
    trigger('fadeOut', [
      state('false', style({ opacity: 1 })),
      state('true', style({ opacity: 0 })),
      transition('false => true', animate('500ms')),
    ])
  ],
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  @Output() checked = new EventEmitter();

  isDeleted = 'false';

  ngOnInit() {
  }

  check() {
    this.isDeleted = 'true';
    this.checked.emit();
  }
}
