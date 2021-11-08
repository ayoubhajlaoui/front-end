import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { Role } from 'src/app/auth/login/role';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostModel } from 'src/app/shared/post-model';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/shared/subreddit-side-bar/subreddit-model';
import { SubredditService } from '../subreddit.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {
  result:SubredditModel[];
  subreddits:SubredditModel[];
  nbreOfPosts:number;

  
   productsPerPage:number=3;
   selectedPage = 2;
    pageCount: number;
    categories: string[]=['ongoing', 'finished'];
    show:boolean;
 

  constructor(private subredditService: SubredditService, private postService: PostService,  private router: Router, private authService: AuthService, private toastr: ToastrService ) { 
    
    if (authService.getRole()==Role.Admin){
      this.show=true;
    
    subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    })
    }
    if(authService.getRole()==Role.User){
      subredditService.getSubredditsByUsername(authService.getUserName()).subscribe(data => {
        this.subreddits = data;
      }, error => {
        throwError(error);
      })
    }
  }

  ngOnInit() {
    //this.getSubreddits;
    
  }

  // get subreddits(): SubredditModel[]{
  //   this.subredditService.getAllSubreddits().subscribe(data => {

  //     let pageIndex = (this.selectedPage - 1) * this.productsPerPage;
  //     this.result = data.slice(pageIndex, pageIndex + this.productsPerPage);
  //   }, error => {
  //     throwError(error);
  //   })
  //   return this.result; 
  // }

  // allSubreddits():SubredditModel[]{
  //   this.subredditService.getAllSubreddits().subscribe(data => {
  //     this.topics = data;
  //   }, error => {
  //     throwError(error);
  //   })
  //   return this.topics;
  // }

  //goToPosts(id: number): void {
    //this.router.navigateByUrl('/view-subreddit/' + id);
  //}
  // getSubreddits(){
  //   if (this.authService.getRole()==Role.Admin){
  //     this.show=true;
    
  //   this.subredditService.getAllSubreddits().subscribe(data => {
  //     this.subreddits = data;
  //   }, error => {
  //     throwError(error);
  //   })
  //   }
  //   if(this.authService.getRole()==Role.User){
  //     this.subredditService.getSubredditsByUsername(this.authService.getUserName()).subscribe(data => {
  //       this.subreddits = data;
  //     }, error => {
  //       throwError(error);
  //     })
  //   }
  // }

  deleteSubreddit(id:number){
    this.subredditService.deleteSubreddit(id).subscribe(data =>{});
    this.subreddits = this.subreddits.filter(item => item.id != id);
    this.toastr.info("topic deleted successefully");
  }

  viewPosts(id: number){
    this.router.navigateByUrl('/view-subreddit/' + id);
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
}

changePageSize(event:Event) {
    this.productsPerPage = (Number)((event.target as HTMLSelectElement).value);
    //window.location.reload(); 
    this.changePage(1);
}

// getPageCount(): number {
//     return this.pageCount= Math.ceil(this.allSubreddits().length / this.productsPerPage);
    
// }
nbreOfPostsBySub(id:number):number{
  this.postService.viewSubredditPosts(id).subscribe(data => {
     this.nbreOfPosts=data.length;
  }, error => {
    throwError(error);
  })
  return this.nbreOfPosts;
}


}