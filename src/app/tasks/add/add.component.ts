import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { ITask, ITaskTypeOption } from './task.interface';
import {MatStepperIntl, MatStepperModule} from '@angular/material/stepper'; 
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Role } from 'src/app/auth/login/role';

@Injectable()
export class StepperIntl extends MatStepperIntl {
  // the default optional label text, if unspecified is "Optional"
  optionalLabel = 'Optional Label';
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  // taskForm: FormGroup;
  // task:ITask;
  // typeOptions: Array<ITaskTypeOption> = [];
  // constructor(
  //   private taskService: TaskService,
  //   private router: Router
  // ) {
  //   this.task = {
  //     name: '',
  //     type: '',
  //     description: '',
  //     dueDate:new Date()
  //   }


  // }

  // ngOnInit(): void {
  //   this.taskForm = new FormGroup({
  //     name: new FormControl ('', Validators.required),
  //     dueDate: new FormControl ('', Validators.required),
  //     type: new FormControl ('', Validators.required),
  //     description: new FormControl('', Validators.required),
  //   });
  //   this.typeOptions = this.taskService.getTypeOptions();
  // }

  // addTask() {
  //   this.task.name=this.taskForm.get('name')?.value;
  //   this.task.type=this.taskForm.get('type')?.value;
  //   this.task.dueDate=this.taskForm.get('dueDate')?.value;
  //   this.task.description=this.taskForm.get('description')?.value;
  //   this.taskService.postTask(this.task).subscribe(
  //     (d) => {
  //       console.log(d);
  //       this.router.navigateByUrl('/');
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  optionalLabelText: string;
  optionalLabelTextChoices: string[] = ['Option 1', 'Option 2', 'Option 3'];
  task:ITask;
  typeOptions: Array<ITaskTypeOption> = [];
  public dialogRef: MatDialogRef<AddComponent>

  constructor(
    private _formBuilder: FormBuilder,
    private _matStepperIntl: MatStepperIntl,
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) {
    this.task = {
      name: '',
      type: '',
      description: '',
      dueDate:new Date(),
      username: ''
    }
   
  }

  updateOptionalLabel() {
    this._matStepperIntl.optionalLabel = this.optionalLabelText;
    // Required for the optional label text to be updated
    // Notifies the MatStepperIntl service that a change has been made
    this._matStepperIntl.changes.next();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      dueDate: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      description: ['', Validators.required]
    });

    this.typeOptions = this.taskService.getTypeOptions();

     
  }

  addTask(){
    this.task.name= this.firstFormGroup.get('name')?.value;
    this.task.dueDate= this.secondFormGroup.get('dueDate')?.value;
    this.task.type=this.optionalLabelText;
    this.task.description= this.thirdFormGroup.get('description')?.value;

    this.taskService.postTask(this.task).subscribe(
          (d) => {
            console.log(d);
            if(this.authService.getRole()==Role.Admin)
            {
              this.router.navigateByUrl('/admin');
            }else{
              this.router.navigateByUrl('/user');
            }
          },
          (error) => {
            console.error(error);
          }
        );




  }
}