import {Component, inject} from '@angular/core';
import {TasksServices} from '../shared/tasks.services';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {
  protected tasksServices = inject(TasksServices);

  currentId?: number;
  currentTask?: {id:number; title:string; date:string; description:string};
  getId(){
    // console.log(this.tasksServices.getCurrentTask());
    this.currentId = this.tasksServices.getCurrentTask();
  }
  getTask(){
    this.getId();
    if(this.currentId) {
      this.currentTask = this.tasksServices.getTaskById(this.currentId);
      // console.log(this.currentTask);
      return this.currentTask;
    } else{
      // console.log("not defined");
      return undefined;
    }
  }



}
