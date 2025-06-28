import {Component, effect, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TaskData, TaskValue} from '../../shared/shared';
import {TasksServices} from '../../shared/tasks.services';

@Component({
  selector: 'app-new-task',
  imports: [
    FormsModule
  ],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})
export class NewTask {
  @Input() enteredTitle:string='';
  @Input() enteredDate:string='';
  @Input() enteredDescription:string='';

  private tasksService = inject(TasksServices);


  onClickCancel() {
    this.tasksService.displayAddMenu.set(false);
    this.tasksService.displayEditMenu.set(false);
  }

  onSubmit() {
    if(this.enteredTitle!='') {
      if (this.tasksService.displayAddMenu()) {
        const taskData: TaskData = {
          title: this.enteredTitle,
          date: this.enteredDate,
          description: this.enteredDescription
        };
        this.tasksService.addNewTask(taskData).subscribe({
          next: task => console.log('added task: ', task)
        });
      } else if (this.tasksService.displayEditMenu()) {
        const taskValue: TaskValue = {
          id: this.tasksService.currentTaskId(),
          title: this.enteredTitle,
          date: this.enteredDate,
          description: this.enteredDescription
        }
        this.tasksService.editTheTask(taskValue).subscribe({
          next: task=> console.log('edited task: '+task)
        });
      }
      this.tasksService.displayAddMenu.set(false);
      this.tasksService.displayEditMenu.set(false);
    }


  }
}
