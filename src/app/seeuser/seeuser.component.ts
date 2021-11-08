import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentPayload } from 'src/app/comment/comment-payload';
import { CommentService } from 'src/app/comment/comment.service';

import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { AuthService } from '../auth/shared/auth.service';


@Component({
  selector: 'app-seeuser',
  templateUrl: './seeuser.component.html',
  styleUrls: ['./seeuser.component.css']
})
export class SeeuserComponent implements OnInit {

  //name: string;
  posts!: PostModel[];
  comments!: CommentPayload[];
  postLength!: number;
  commentLength!: number;
  username!: string;

  ngOnInit(): void {
    this.username = this.authService.getUserName();
    this.postService.getAllPostsByUser(this.username).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.username).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  constructor(private authService: AuthService,private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService) {
     //this.username = this.activatedRoute.snapshot.params.userName;

   
  }

  

}