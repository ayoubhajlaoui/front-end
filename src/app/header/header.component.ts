import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { NotificationModel } from '../notification';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { Role } from '../auth/login/role';
declare  var jQuery:  any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  isLoggedIn!: boolean;
  username!: string;
  notificationCount:number ;
  notifications: Array<NotificationModel>;
  show:boolean;
  displayViewAll:boolean;
  key: string;
  @Output() msgToSibling = new EventEmitter<any>();

  
  constructor(private data: DataService, private postService:PostService, private authService: AuthService, private router: Router, private notificationService: NotificationService) {
    if(authService.getRole()==Role.Admin){
      this.show=false;
    }else{this.show=true}
  }
    

  @ViewChild('draggable') private draggableElement: ElementRef;

  ngOnInit() {
    (function ($) {
     
    })(jQuery);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.username = this.authService.getUserName();
    this.getNotificationsCount();
    
  }


  updateKey() {
    this.data.updateMessage(this.key);
  }


  msgToSib(){
    this.msgToSibling.emit(this.key);
  }

  public getNotificationsCount(): void {

    if(this.authService.getRole()==Role.Admin){
      this.notificationService.notificationsByRole("ROLE_USER").subscribe(
        (response: NotificationModel[]) => {
          this.notificationCount=response.length; 
          this.notifications = response;
          // if(response.length> 3){
          //   this.notifications = response.splice(0, 3);
          //   this.displayViewAll = true;
  
          // }else {this.notifications = response;}
          
                 
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    

      if(this.authService.getRole()==Role.User){
        this.notificationService.notificationsByRole("ROLE_ADMIN").subscribe(
          (response: NotificationModel[]) => {
            this.notificationCount=response.length; 
            this.notifications = response;
            // if(response.length> 3){
            //   this.notifications = response.splice(0, 3);
            //   this.displayViewAll = true;
    
            // }else {this.notifications = response;}
            
                   
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );

    }
    
  }




    
  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }

  goToManager() {
    this.router.navigateByUrl('/accountsmanager');
  }

  goToPost(postId: number, id:number): void {

    
    // this.notificationCount=this.notificationCount-1;
    // this.notifications.forEach( (item, index) => {
    //   if(item.id === id) this.notifications.splice(index,1);
    // });

    this.notificationService.deleteNotification(id).subscribe(
      (d) => {});
    this.draggableElement.nativeElement.remove();
    this.router.navigateByUrl('/view-post/' + postId);
    
    
  }

  goToCreateTask() {
    this.router.navigateByUrl('/add');
  }

  goToTaskHome() {
    this.router.navigateByUrl('/taskHome');
  }


  goToHome(){
    if(this.authService.getRole()==Role.Admin){
      this.router.navigateByUrl('/admin');
    }else{
      this.router.navigateByUrl('/user');
    }
    
  } 



  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  // public searchPostsByUsers(key: string): void {
  //   console.log(key);
  //   const results: PostModel[] = [];
  //   for (const post of this.posts$) {
  //     if (post.userName.toLowerCase().indexOf(key.toLowerCase()) !== -1){
  //       results.push(post);
  //     }
  //   }
  //   this.posts$ = results;
    
  //   this.msgToSib();
  // }

 

  
    
  

}

