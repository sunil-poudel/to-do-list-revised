import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TaskData} from '../../shared/shared';

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

  @Output() displayFlag = new EventEmitter<boolean>();
  @Output() editDisplayFlag = new EventEmitter<boolean>();

  onClickCancel(){
    this.displayFlag.emit(false);
    this.editDisplayFlag.emit(false);
  }

  @Output() submittedTask = new EventEmitter<TaskData>();
  onSubmit(){
    const task = {
      title: this.enteredTitle,
      date: this.enteredDate,
      description: this.enteredDescription
    };
    this.submittedTask.emit(task);
    // console.log(task);
    this.onClickCancel();
  }

}
