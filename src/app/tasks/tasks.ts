import {Component, inject, OnInit, signal} from '@angular/core';
import {TasksServices} from '../shared/tasks.services';
import {NgClass} from '@angular/common';
import {Task} from '../shared/shared'

@Component({
  selector: 'app-tasks',
  imports: [
    NgClass
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks implements OnInit{
  protected tasksServices = inject(TasksServices);
  tasks = signal<Task[]>([]);

  ngOnInit(): void {
    this.tasksServices.getAllTasks().subscribe({
      next: tasks=> this.tasks.set(tasks)
    });
  }


}
