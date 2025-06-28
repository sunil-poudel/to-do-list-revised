import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import {Tasks} from './tasks/tasks';
import {Task} from './task/task';
import {Menu} from './menu/menu';
import {Footer} from './footer/footer';
import {TaskData} from './shared/shared';
import {TasksServices} from './shared/tasks.services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Tasks, Task, Menu, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  newlyAddedTask!: TaskData;
  isSave:boolean = false;
  isEdit: boolean = false;


  private tasksServices = inject(TasksServices);
  getNewlyAddedTask(task:{taskData: TaskData, isSave: boolean, isEdit:boolean}){
    this.newlyAddedTask = task.taskData;
    this.isSave = task.isSave;
    this.isEdit = task.isEdit;
    if(this.isSave) {
      this.addTask(task.taskData);
    } else if(this.isEdit){
      this.editTask(task.taskData);
    }
    // console.log(this.newlyAddedTask);
  }
  addTask(newlyAddedTask: TaskData){
    this.tasksServices.addTask(newlyAddedTask);
  }
  editTask(newlyAddedTask: TaskData){
    const id = this.tasksServices.getCurrentTask();
    if(id) {
      this.tasksServices.editTask(id,newlyAddedTask)
    }
  }
}
