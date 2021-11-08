import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { DataService } from 'src/app/data.service';
import { TaskService } from 'src/app/task.service';
import { AddComponent } from '../add/add.component';
import { ITask } from '../add/task.interface';
import { ShowComponent } from '../show/show.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Output() refreshEmitter = new EventEmitter<boolean>();

  tasks: Array<ITask>;
  key:string
  constructor(private auth:AuthService, private data:DataService,private taskService: TaskService, public dialog: MatDialog) {
    this.getTasks();
    
  }

  ngOnInit(): void {

    this.data.getMessage().subscribe(message => {
      this.key = message;
      // this.getTasks();
      this.taskService.getTaskByUserName(this.key).subscribe(task => {
        this.tasks=task
      });
      // this.getTasksByUsername(this.key, this.tasks)      
    });
    
  }

  getTasksByUsername(key:string, tasks:Array<ITask>){
    const results: ITask[] = [];
    for (const task of tasks) {
      if (task.username.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(task);
      }
    }
    tasks = results;
    return tasks

  }

  

  getTasks() {
    this.taskService.getTaskList().subscribe(data => {
      this.tasks = data;
    }, error => {
      throwError(error);
    });
  }

  onOpenDialog(task: ITask) {
    const dialogRef = this.dialog.open(ShowComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTasks();
      this.refreshEmitter.emit(true);
    });
  }

  onOpenDialogCreate() {
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getTasks();
      this.refreshEmitter.emit(true);
    });
  }
}