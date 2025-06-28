import {Component, inject} from '@angular/core';
import {TasksServices} from '../shared/tasks.services';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [
    NgClass
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  protected tasksServices = inject(TasksServices);

}
