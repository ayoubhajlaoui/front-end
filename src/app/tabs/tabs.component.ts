import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Role } from '../auth/login/role';
import { AuthService } from '../auth/shared/auth.service';

import { DataService } from '../data.service';
import { PostModel } from '../shared/post-model';
import { PostService } from '../shared/post.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit{

  posts$: Array<PostModel>;
  

  events: string[] = [];
  opened: boolean;
  displayViewAll: boolean;
  key= '';
  subscription:Subscription;
  userId: number;

  // @Input()
  // currentMsgFromChild1ToChild2:any;

  showTabs:boolean;

 

  constructor(private userService: UserService, private data:DataService, private postService: PostService, private authService:AuthService ) {

    
    if(authService.getRole()==Role.Admin){
      this.showTabs=false;
    this.postService.getAllPosts().subscribe(post => {
      this.posts$ = post;
    });
    }else if(authService.getRole()==Role.User){
      this.showTabs=true;
      this.userService.getUserByUsername(authService.getUserName()).subscribe(data =>{
        this.userId = data.userId;
        this.postService.getAdminPosts(this.userId).subscribe(post => {
          this.posts$ = post;
        })
      });
      
    }
   } 
   
   ngOnInit() {

    this.data.getMessage().subscribe(message => {
      this.key = message;
      if(this.authService.getRole()==Role.Admin){
        this.postService.getAllPosts().subscribe(post => {
          if(this.key==null){
           this.posts$=post; 
          }else{
            this.posts$ =this.searchPostsByUsers(post,this.key)
          }
          
        });
      }
      
                      
    });

   
    
         
    
  }  


   public searchPostsByUsers(posts$:PostModel[], key: string): PostModel[] {
    console.log(key);
    const results: PostModel[] = [];
    for (const post of posts$) {
      if (post.userName.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(post);
      }
    }
    posts$ = results;
    return posts$

  }
}