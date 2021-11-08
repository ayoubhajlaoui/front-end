import { Component, Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { PostService } from '../shared/post.service';
import {ThemeService} from 'ng-bootstrap-darkmode';
import { DarkModeService } from 'angular-dark-mode';
declare  var jQuery:  any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
 

 //posts$: Array<PostModel> = [];
 username: string;

 events: string[] = [];
 opened: boolean;
 displayViewAll: boolean;


 

 constructor(private postService: PostService, private darkModeService: DarkModeService) {
   //this.postService.getAllPosts().subscribe(post => {
     
     
       // if (post.length > 3) {
       //   this.posts$ = post.splice(0, 3);
       //   this.displayViewAll = true;
       // } else {
         //this.posts$ = post;
       // }
     //});
   
 }



 ngOnInit() {
  
 }

 //getPostsByUser(){
   //this.postService.getAllPostsByUser(this.username).subscribe(post => {
     //this.posts$ = post;
 //}); 


// public searchPostsByUsers(key: string): void {
//   console.log(key);
//   const results: PostModel[] = [];
//   for (const post of this.posts$) {
//     if (post.userName.toLowerCase().indexOf(key.toLowerCase()) !== -1){
//       results.push(post);
//     }
//   }
//   this.posts$ = results;
//   if (results.length === 0 || !key) {
//     this.postService.getAllPosts().subscribe(post => {
//       this.posts$ = post;
//     });
//   }
// }

shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
