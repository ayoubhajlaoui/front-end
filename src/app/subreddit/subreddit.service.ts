import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../shared/post-model';
import { SubredditModel } from '../shared/subreddit-side-bar/subreddit-model';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit');
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post('http://localhost:8080/api/subreddit', subredditModel);
  }

  deleteSubreddit(id: number):Observable<void>{
    return this.http.delete<void>('http://localhost:8080/api/subreddit/' +id);
  }

  getSubredditsByUsername(username: String):Observable<Array<SubredditModel>>{
    return this.http.get<Array<SubredditModel>>('http://localhost:8080/api/subreddit/subreddits-by-username/' + username);
  }

  
}