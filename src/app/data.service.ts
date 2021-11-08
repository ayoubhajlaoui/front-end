import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PostModel } from './shared/post-model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
   

 
  private observer = new BehaviorSubject("");
  
  constructor() { }

  public getMessage(): Observable<string> {
    return  this.observer.asObservable();
  }

  public updateMessage(key:string):void {
    this.observer.next(key)
  }

  // public searchPostsByUsers(posts$:PostModel[],key: string):Observable<PostModel[]>  {
  //   console.log(key);
  //   const results: PostModel[] = [];
  //   for (const post of posts$) {
  //     if (post.userName.toLowerCase().indexOf(key.toLowerCase()) !== -1){
  //       results.push(post);
  //     }
  //   }
  //   posts$ = results;
  //   return posts$.asObsevable();

  // }

}
