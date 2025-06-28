import {TaskData, Task} from './shared';
import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

@Injectable({providedIn: "root"})
export class TasksServices{
  private tasks = signal<Task[]>([]);
  private httpClient = inject(HttpClient);

  fetchData(url: string, fetchError: string){
    this.httpClient.get<Task[]>(url).pipe(
      catchError(error=> throwError(()=> new Error(fetchError)))
    );
  }


}
