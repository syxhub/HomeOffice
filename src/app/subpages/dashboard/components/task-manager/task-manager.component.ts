import { TranslateService } from '@ngx-translate/core';
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
    private authService: AuthService,
    private database: DatabaseService,
    private dragulaService: DragulaService,
    private modalService: NgbModal,
    private toast: ToastrService,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.authService.user
      .subscribe(user => {
        this.uid = user.uid;
        this.database.getTaskList(user.uid)
          .subscribe(tasks => {
            this.tasks = [];
            tasks.map(task => {
              this.tasks.push(task.payload.val());
            });
          });
      });
  }

  addTask() {
    const newTaskModal = this.modalService.open(CreateTaskComponent)
      .result.then((task: Task) => {
        this.tasks.push(task);
        this.database.modifyTaskList(this.uid, this.tasks);
        this.translate.get(['message.success.taskSuccess', 'message.success.taskCreation'])
          .subscribe(messages => {
            this.toast.showToast(`success`, messages[Object.keys(messages)[0]], messages[Object.keys(messages)[1]]);
          });
      })
      .catch(reason => {
        this.translate.get(['message.success.taskSuccess', 'message.alert.taskCreationFailed'])
          .subscribe(messages => {
            this.toast.showToast(`warning`, messages[Object.keys(messages)[0]], messages[Object.keys(messages)[1]]);
          });
      });
  }

  taskDone(taskIndex: number) {
    setTimeout(() => {
      this.tasks.splice(taskIndex, 1);
      this.database.modifyTaskList(this.uid, this.tasks);
      this.translate.get(['message.success.taskSuccess', 'message.success.taskDone'])
        .subscribe(messages => {
          this.toast.showToast(`success`, messages[Object.keys(messages)[0]], messages[Object.keys(messages)[1]]);
        });
    }, 500);
  }
}
