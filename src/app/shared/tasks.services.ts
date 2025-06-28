import {TaskData, Task} from './shared';
import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: "root"})
export class TasksServices{
  private tasks = signal<Task[]>([]);
  private httpClient = inject(HttpClient);


}
