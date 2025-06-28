import {TaskData, TaskValue} from './shared';
import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, tap, throwError} from 'rxjs';

@Injectable({providedIn: "root"})
export class TasksServices{
  tasks = signal<TaskData[]>([]);
  private httpClient = inject(HttpClient);

  currentTaskId = signal<number>(-1);
  displayAddMenu = signal(false);

  getAllTasks(){
    return this.fetchData('http://localhost:8080/apis/tasks', 'sorry! could not load tasks!');
  }
  getTaskById(id: number){
    return this.fetchDataById(`http://localhost:8080/apis/tasks/${id}`, 'sorry! could not load selected task!');
  }
  addNewTask(taskData: TaskData){
    return this.addTask('http://localhost:8080/apis/tasks', taskData).pipe(
      tap({
        next: value=> this.tasks.update((task)=> [...task, value])
      })
    );
  }
  editTheTask(taskValue: TaskValue){
    return this.editTask('http://localhost:8080/apis/tasks', taskValue);
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
  private addTask(url: string, taskData: TaskData){
    return this.httpClient.post<TaskData>(url, taskData);
  }
  private editTask(url: string, taskValue: TaskValue){
    return this.httpClient.put<TaskValue>(url, taskValue);
  }



}
