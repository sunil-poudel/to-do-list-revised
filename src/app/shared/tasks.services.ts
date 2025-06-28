import {TaskData, TaskValue} from './shared';
import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

@Injectable({providedIn: "root"})
export class TasksServices{
  private tasks = signal<TaskValue[]>([]);
  private httpClient = inject(HttpClient);

  currentTaskId = signal<number>(-1);
  displayAddMenu = signal(false);

  getAllTasks(){
    return this.fetchData('http://localhost:8080/apis/tasks', 'sorry! could not load tasks!');
  }
  getTaskById(id: number){
    return this.fetchDataById(`http://localhost:8080/apis/tasks/${id}`, 'sorry! could not load selected task!');
  }


  private fetchData(url: string, fetchError: string){
    return this.httpClient.get<TaskValue[]>(url).pipe(
      catchError(error=> throwError(()=> new Error(fetchError)))
    );
  }
  private fetchDataById(url: string, fetchError: string){
    return this.httpClient.get<TaskValue>(url).pipe(
      catchError(error=> throwError(()=> new Error(fetchError)))
    );
  }



}
