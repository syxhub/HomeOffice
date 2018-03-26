import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';

import { Task } from '../../../../model/task.model';
import { AuthService } from './../../../../shared/auth/auth.service';
import { DatabaseService } from './../../../../shared/database/database.service';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ToastrService } from '../../../../layout/toastr.service';

@Component({
  selector: 'ho-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit {

  tasks: Array<Task> = [];
  uid: string;

  constructor(
    private auth: AuthService,
    private database: DatabaseService,
    private dragulaService: DragulaService,
    private modalService: NgbModal,
    private toast: ToastrService
  ) {
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.uid = user.uid;
      this.getTaskList(user.uid);
    });
  }

  addTask() {
    const newTaskModal = this.modalService.open(CreateTaskComponent)
      .result.then((task: Task) => {
        this.tasks.push(task);
        this.database.modifyTaskList(this.uid, this.tasks);
        this.toast.showToast(`success`, 'Task', 'Task has been successfully created!');
      })
      .catch(reason => {
        console.log('Task creation has been cancelled.');
        this.toast.showToast(`warning`, 'Task', 'Task creation has been cancelled!');
      });
  }

  getTaskList(uid: string) {
    this.database.getTaskList(uid)
      .subscribe(tasks => {
        this.tasks = [];
        tasks.map(task => {
          this.tasks.push(task.payload.val());
        });
      });
  }

  taskDone(taskIndex: number) {
    setTimeout(() => {
      this.tasks.splice(taskIndex, 1);
      this.database.modifyTaskList(this.uid, this.tasks);
      this.toast.showToast(`success`, 'Task', 'Task has been completed!');
    }, 500);
  }
}
