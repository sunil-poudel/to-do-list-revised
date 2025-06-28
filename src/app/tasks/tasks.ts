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

  getArchivedStatus(){
    return this.tasksServices.getArchivedStatus();
  }

  getAllTasks(){
    return this.tasksServices.getTasks();
  }


  setCurrentTask(id: number){
    this.tasksServices.setCurrentTask(id);
    // console.log("set current task of id: "+id);
  }

  selectedTask: any = null;

  selectTask(task: any) {
    this.selectedTask = task;
  }


  onClick() {
    console.log("Clicked id: "+this.tasksServices.getCurrentTask())
  }
}
