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

}
