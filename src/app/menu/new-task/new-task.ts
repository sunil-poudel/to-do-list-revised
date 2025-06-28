import {Component, effect, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TaskData} from '../../shared/shared';
import {TasksServices} from '../../shared/tasks.services';

@Component({
  selector: 'app-new-task',
  imports: [
    FormsModule
  ],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})
export class NewTask {
  private tasksService = inject(TasksServices);


  onClickCancel() {

  }

  onSubmit() {

  }
}
