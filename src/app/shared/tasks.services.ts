import {TaskData, Task} from './shared';
import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

@Injectable({providedIn: "root"})
export class TasksServices{
  private tasks = signal<Task[]>([]);
  private httpClient = inject(HttpClient);

  currentTaskId = signal<number>(-1);

  getAllTasks(){
    return this.fetchData('http://localhost:8080/apis/tasks', 'sorry! could not load tasks!');
  }
  getTaskById(id: number){
    return this.fetchData(`http://localhost:8080/apis/tasks/${id}`, 'sorry! could not load selected task!');
  }


  private fetchData(url: string, fetchError: string){
    return this.httpClient.get<Task[]>(url).pipe(
      catchError(error=> throwError(()=> new Error(fetchError)))
    );
  }


}
