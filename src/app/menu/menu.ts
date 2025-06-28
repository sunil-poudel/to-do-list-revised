import {Component, EventEmitter, Output, inject} from '@angular/core';
import {NewTask} from './new-task/new-task';
import {TaskData} from '../shared/shared'
import {TasksServices} from '../shared/tasks.services';

@Component({
  selector: 'app-menu',
  imports: [
    NewTask
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  displayFlag: boolean = false;
  editDisplayFlag: boolean = false;
  submittedTask!: TaskData;
  protected tasksServices = inject(TasksServices);
  currentIndex?: number;
  currentTask?: {id: number; title: string; date: string; description:string};

  isSave: boolean = false;
  isEdit: boolean = true;

  onClickAdd(){
    this.displayFlag = true;
    this.isSave = true;
    this.isEdit = false;
  }

  onClickArchives(){
    this.tasksServices.setArchived(true);
  }

  onClickDelete(){
    this.getCurrentIndex();
    if(this.currentIndex != undefined){
      this.tasksServices.deleteTask(this.currentIndex);
      // console.log("deleted task with id: "+this.currentIndex);
      // console.log("remaining tasks:\n "+ this.tasksServices.getTasks().length);
    }
  }

  onClickEdit(){
    if(this.getCurrentTask()) {
      this.editDisplayFlag = true;
      this.isEdit = true;
      this.isSave = false;
      // console.log(this.editDisplayFlag);
    } else{
      this.isEdit = false;
      this.isSave = false;
    }
  }

  onClickMarkComplete(){
    const id = this.tasksServices.getCurrentTask();
    if(id){
      this.tasksServices.archiveTask(id);
    }
  }
  onClickMarkIncomplete(){
    const id = this.tasksServices.getCurrentTask();
    if(id){
      this.tasksServices.markTaskIncomplete(id);
    }
  }

  getCurrentIndex(){
    this.currentIndex = this.tasksServices.getCurrentTask();
  }
  getCurrentTask(){
    this.getCurrentIndex();
    if(this.currentIndex != undefined) {
      this.currentTask = this.tasksServices.getTaskById(this.currentIndex);
    }
    return this.currentTask;
  }


  getDisplayFlag(displayFlag: boolean){
    this.displayFlag = displayFlag;
  }
  getEditDisplayFlag(editDisplayFlag: boolean){
    this.editDisplayFlag = editDisplayFlag;
  }

  getSubmittedTask(submittedTask: TaskData){
    this.submittedTask = submittedTask;
    // console.log(submittedTask);
    this.sendSubmittedTaskToApp();
  }


  @Output() submittedTaskToApp  = new EventEmitter<{ taskData: TaskData, isSave:boolean, isEdit: boolean }>();
  sendSubmittedTaskToApp(){
    this.submittedTaskToApp.emit({taskData:this.submittedTask, isSave:this.isSave, isEdit: this.isEdit});
  }

  getArchivedStatus(){
    return this.tasksServices.getArchivedStatus();
  }
  onClickBack(){
    this.tasksServices.flipArchived();
  }
}
