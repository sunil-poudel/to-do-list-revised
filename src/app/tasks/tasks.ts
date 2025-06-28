import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {TasksServices} from '../shared/tasks.services';
import {TaskValue} from '../shared/shared'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit{
  protected tasksServices = inject(TasksServices);
  tasks = this.tasksServices.tasks;

  ngOnInit(): void {
    this.tasksServices.getAllTasks().subscribe({
      next: tasks=> this.tasks.set(tasks)
    });
  }

  onClickTasks(id: number){
    this.tasksServices.currentTaskId.set(id);
  }


}
