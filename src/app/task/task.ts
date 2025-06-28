import {Component, effect, inject, OnInit} from '@angular/core';
import {TasksServices} from '../shared/tasks.services';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task{
  protected tasksServices = inject(TasksServices);
  currentTaskId = this.tasksServices.currentTaskId();

  constructor() {
    effect(() => {
      this.currentTaskId = this.tasksServices.currentTaskId();
      console.log(this.currentTaskId);
    });
  }

}
