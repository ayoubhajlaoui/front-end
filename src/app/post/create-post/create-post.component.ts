import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Role } from 'src/app/auth/login/role';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { User } from 'src/app/manager/user';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/shared/subreddit-side-bar/subreddit-model';
import { UserService } from 'src/app/shared/user.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { CreatePostPayload } from '../create-post-payload';
import { UploadanddownloadComponent } from './uploadanddownload/uploadanddownload.component';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  items: string[] = [];

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel> = [];
  
  postName: string;


  isOn:boolean = false;
  users: User[];
  targetNames: string;

  

  constructor(private router: Router, private postService: PostService,private authService: AuthService,
    private subredditService: SubredditService, private userService: UserService ) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: '',
      targetNames: '',
      fileName: ''
             
      }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      
    });
   
    
      this.subredditService.getSubredditsByUsername(this.authService.getUserName()).subscribe((data) => {
        this.subreddits = data;
      }, error => {
        throwError(error);
      });

      this.userService.getUsers().subscribe(data =>{
        this.users=data;
      });    
    
  }

  //ngAfterViewInit() {this.msgFromChild1 = this.child1.msgFromChild1; }

  addItem(newItem: string) {
    this.items.push(newItem);
  }

  createPost() {
    console.log();
    
    
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;
    this.postPayload.targetNames = this.createPostForm.get('userName').value;
    this.postPayload.fileName = this.items[0];
          

    console.log(this.postPayload);

    
    //this.postPayload.targetUserIds = this.createPostForm.get('userName')?.value;
    //this.postPayload.fileName = this.msgFromChild1;
    

    this.postService.createPost(this.postPayload).subscribe((data) => {
      if(this.authService.getRole()=='ROLE_USER'){
        this.router.navigateByUrl('user');
      }else{this.router.navigateByUrl('admin');}
      

    }, error => {
      throwError(error);
    });
    this.isOn = true;
  }

  discardPost() {
    if(this.authService.getRole()=='ROLE_USER'){
      this.router.navigateByUrl('user');
    }else{this.router.navigateByUrl('admin');}
    
  }

}
