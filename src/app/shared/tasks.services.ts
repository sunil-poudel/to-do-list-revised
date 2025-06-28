import {TaskData} from './shared';
import {Injectable} from '@angular/core';

@Injectable({providedIn: "root"})
export class TasksServices{
  private tasks: {id:number, title:string, date:string, description:string}[] = [];
  private archivedTasks: {id:number, title:string, date:string, description:string}[] = [];

  constructor(){
    const tasks = localStorage.getItem('tasks');


    if(tasks){
      this.tasks = JSON.parse(tasks);
    }
  }

  private saveTask(){
    // set item with key 'tasks', which is the key we're looking
    //while retrieving task in constructor.
    //convert to json string to store task.
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  isArchived:boolean = false;

  setArchived(isArchived:boolean){
    this.isArchived = isArchived;
  }

  flipArchived(){
    this.isArchived = !this.isArchived;
  }

  getArchivedStatus(){
    return this.isArchived;
  }

  id: number = 0;
  addTask(taskData: TaskData){
    this.id++;
    const task = {id:this.id, title:taskData.title, date:taskData.date, description:taskData.description}
    this.tasks.unshift(task);
    this.saveTask();
    // console.log(task);
  }

  getTasks(){
    if(this.isArchived){
      return this.archivedTasks;
    } else {
      return this.tasks;
    }
  }

  getTaskById(id:number){
    return this.getTasks().find((task)=>task.id === id);
  }
  currentTask?:{id:number, title:string, date:string, description:string};

  setCurrentTask(id:number){
    this.currentTask = this.getTasks().find((task)=>task.id === id);
    // console.log("current task set as "+this.currentTask?.title);
    this.saveTask();
  }


  getCurrentTask(){
    this.saveTask();
    return this.currentTask?.id;
  }


  deleteTask(id: number){
    this.tasks = this.tasks.filter((task)=> task.id != id);
    this.saveTask();
  }

  editTask(id: number, taskData: TaskData){
    const task = this.getTaskById(id);
    if(task) {
      task.title = taskData.title;
      task.date = taskData.date;
      task.description = taskData.description;
    }
    this.saveTask();
  }

  archiveTask(id: number){
    const taskTemp = this.tasks.find((task)=> task.id === id);
    if(taskTemp) {
      this.archivedTasks.unshift(taskTemp);
      this.deleteTask(id);
      this.saveTask();
    }
  }

  markTaskIncomplete(id: number){
    const taskTemp = this.archivedTasks.find((task)=> task.id === id);
    if(taskTemp){
      this.tasks.push(taskTemp);
      this.tasks = this.tasks.sort((a,b)=>b.id-a.id);
      this.archivedTasks = this.archivedTasks.filter((task)=>task.id != id);
      this.saveTask();
    }
  }

}
