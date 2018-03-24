import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Task } from '../../../../model/task.model';

@Component({
  selector: 'ho-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  tasks: Array<Task> = [];

  constructor(private dragulaService: DragulaService) {

  }

  ngOnInit() {
    const list = ['afterthought', 'downtown', 'observation', 'beginner', 'snail', 'coal', 'car'];
    for (let i = 0; i < list.length; i++) {
      this.tasks.push(new Task(list[i], ''));
    }
  }

  addTask() {
    this.tasks.push(new Task('', ''));
  }

  taskDone(taskIndex: number) {
    setTimeout(() => {
      this.tasks.splice(taskIndex, 1);
    }, 500);
  }
}
