import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { SubredditService } from '../subreddit.service';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {

  postSubreddit$!:PostModel[];

  constructor(private subredditService: SubredditService, private postService: PostService,  private route: ActivatedRoute) { }

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.viewSubredditPosts(id).subscribe(data => {
      this.postSubreddit$ = data;
    }, error => {
      throwError(error);
    })
  }
  }

 
    


