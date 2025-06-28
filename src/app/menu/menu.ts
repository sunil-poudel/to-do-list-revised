import {Component, EventEmitter, Output, inject} from '@angular/core';
import {TasksServices} from '../shared/tasks.services';

@Component({
  selector: 'app-menu',
  imports: [
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  private tasksService = inject(TasksServices);

  onClickAdd(){
    this.tasksService.displayAddMenu.set(true);
  }
}
