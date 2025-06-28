import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {TasksServices} from '../shared/tasks.services';
import {TaskValue} from '../shared/shared';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task implements OnInit{
  protected tasksServices = inject(TasksServices);
  currentTaskId = this.tasksServices.currentTaskId();
  // task?: TaskValue;
  task = this.tasksServices.currentTask;

  constructor() {
    effect(() => {
      this.currentTaskId = this.tasksServices.currentTaskId();
      console.log(this.currentTaskId);

      if(this.currentTaskId>=0) {
        this.tasksServices.getTaskById(this.currentTaskId).subscribe(
          {
            next: task => {
              this.task.set(task);
              // console.log(this.task);
            }
          }
        );
      }
    });

  }

  ngOnInit(): void {

  }


}
