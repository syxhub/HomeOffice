import { Task } from './../../../../../model/task.model';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ho-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  task = new Task('', '');

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
  }

  createTask() {
    this.activeModal.close(this.task);
  }

}
