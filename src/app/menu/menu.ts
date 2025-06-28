import {Component, EventEmitter, Output, inject} from '@angular/core';
import {TasksServices} from '../shared/tasks.services';
import {NewTask} from './new-task/new-task';

@Component({
  selector: 'app-menu',
  imports: [
    NewTask
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  protected tasksService = inject(TasksServices);

  onClickAdd(){
    this.tasksService.displayAddMenu.set(true);
  }
  onClickEdit(){
    if(this.tasksService.currentTaskId()!= -1) {
      this.tasksService.displayEditMenu.set(true);
    }
  }
}
