import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from '../post/create-post-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
  console.log(postPayload);
    return this.http.post('http://localhost:8080/api/posts/', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/by-user/' + name);
  }

  viewSubredditPosts(id:number):Observable<PostModel[]>{
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/by-subreddit/' + id);

  }

  deletePost(id: number):Observable<void>{
    return this.http.delete<void>('http://localhost:8080/api/posts/' + id);
    
  }

  getAdminPosts( userId:number):Observable<PostModel[]>{
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/admin-posts/' +userId);
  }
  
}
