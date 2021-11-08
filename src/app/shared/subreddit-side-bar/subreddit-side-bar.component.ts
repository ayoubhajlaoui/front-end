import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/auth/login/role';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { NotificationService } from 'src/app/notification.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { SubredditModel } from './subreddit-model';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean;
  count: number;

  constructor(private subredditService: SubredditService, private notificationService:NotificationService, private authService:AuthService, private toastr: ToastrService) {
    if(authService.getRole()==Role.Admin){
    this.subredditService.getAllSubreddits().subscribe(data => {
      if (data.length > 3) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }
  if(authService.getRole()==Role.User){
    this.subredditService.getSubredditsByUsername(authService.getUserName()).subscribe(data => {
      if (data.length > 3) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }

  }

  ngOnInit(): void {

    
    
  }

  getNotificationCountForSubreddit(id:number): number{
    this.notificationService.notificationsBySubredditId(id).subscribe(data =>{
      this.count=data.length;
    })
    return this.count;
  }

  deleteSubreddit(id: number){
    this.subredditService.deleteSubreddit(id).subscribe(data =>{}); 
    this.subreddits = this.subreddits.filter(item => item.id != id);
    this.toastr.info("topic deleted successefully");
  }

}