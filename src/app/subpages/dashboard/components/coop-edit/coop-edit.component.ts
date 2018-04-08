import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from '../../../../layout/toastr.service';
import { DatabaseService } from '../../../../shared/database/database.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ho-coop-edit',
  templateUrl: './coop-edit.component.html',
  styleUrls: ['./coop-edit.component.scss']
})
export class CoopEditComponent implements OnInit {

  id = '';
  editorToJoin: '';
  editorText = '';

  constructor(
    private database: DatabaseService,
    private toast: ToastrService,
    private translate: TranslateService
  ) { }

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
    this.translate.get(['message.success.editorSuccess', 'message.success.editorCopyId'])
      .subscribe(messages => {
        this.toast.showToast(`success`, messages[Object.keys(messages)[0]], messages[Object.keys(messages)[1]]);
      });
  }

  createEditor() {
    const id = Math.random().toString(36).substring(2);
    this.database.createEditor(id)
      .subscribe((editor: any) => {
        this.id = id;
        this.editorText = editor.value;
      });
  }

  getEditor(event) {
    if (event.key !== 'Control') {
      this.database.getEditor(this.editorToJoin)
        .subscribe((editor: any) => {
          if (editor.key) {
            this.editorText = editor.payload.val().value;
            if (this.id !== this.editorToJoin) {
              this.id = this.editorToJoin;
              this.translate.get(['message.success.editorSuccess', 'message.success.editorJoin'])
                .subscribe(messages => {
                  this.toast.showToast(`success`, messages[Object.keys(messages)[0]], messages[Object.keys(messages)[1]]);
                });
            }
          }
        });
    }
  }


  change() {
    const currentValue = this.editorText;
    setTimeout(() => {
      if (currentValue === this.editorText) {
        this.database.updateEditorText(this.id, currentValue);
      }
    }, 1000);
  }
}
