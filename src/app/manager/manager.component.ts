import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { NgbButtonLabel } from '@ng-bootstrap/ng-bootstrap';
import { Role } from '../auth/login/role';
import { AuthService } from '../auth/shared/auth.service';
import { UserService } from '../shared/user.service';
import { User } from './user';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  public users!: User[];
  public editUser: User;
  public deleteUser: User;
  public results: User[] = [];
  hasPermission:boolean=false;
  showBars:boolean;

  //label:string = "disable";
  constructor(private userService: UserService, private router:Router, private authService: AuthService ){
    
  }

  ngOnInit() {
    this.getUsers();
    
    }

  public getUsers(): void {
    if (this.authService.getRole()==Role.User){
      const result: User[]=[];
      this.showBars=false;

      this.userService.getUserByUsername(this.authService.getUserName()).subscribe(response => {
          result.push(response);
          
          console.log(result);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      this.users=result;
  

    }else{
      this.showBars=true;
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  }

  public onAddUser(): void {
    this.router.navigateByUrl('/signup');
  }

  public onUpdateUser(user: User): void {
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchUsers(key: string): void {
    console.log(key);
    
    for ( const user of this.users) {
      if (user.username.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        this.results.push(user);
      }
    }
    this.users = this.results;
    if (!key) {
      this.getUsers();
    }
    
  }

  public onOpenModal(user: User, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addUserModal');
    }
    if (mode === 'edit') {
      this.editUser = user;
      button.setAttribute('data-target', '#updateUserModal');
      if (this.editUser.username==(String)(this.authService.getUserName()) ){
        this.hasPermission=true;
      }else{
        this.hasPermission=false;
      }
    }
    if (mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal');
    }
    container!.appendChild(button);
    button.click();
  }

  disableAccount(user: User):string{
    let label:string = "disable";
    user.enabled=!user.enabled;
    if(label=="disable"){
      label = "enable";
    }else if(label = "enable"){
      label = "disable";
    } 
      
    this.userService.updateUser(user).subscribe(
      (response: User) => {
        console.log(response);
        this.getUsers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

   







    return label;

  }

  // enableAccount(user: User):boolean{
  //   user.enabled=true;
      
  //   this.userService.updateUser(user).subscribe(
  //     (response: User) => {
  //       console.log(response);
  //       this.getUsers();
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  //   return user.enabled;

  // }






}
