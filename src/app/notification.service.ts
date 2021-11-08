import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModel } from './notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  notifications(): Observable <NotificationModel[]> {
    return this.http.get<NotificationModel[]>('http://localhost:8080/api/notification/all');
  }


  deleteNotification(id:number) {
    return this.http.delete(`http://localhost:8080/api/notification/${id}`);
  }

  deleteNotificationByPostId(postId:number) {
    return this.http.delete(`http://localhost:8080/api/notification/post/${postId}`);
  }

  notificationsBySubredditId(id: Number): Observable <NotificationModel[]>{
    return this.http.get<NotificationModel[]>(`http://localhost:8080/api/notification/subreddit/${id}`);
  }

  notificationsByRole(rn:string):Observable <NotificationModel[]>{
    return this.http.get<NotificationModel[]>(`http://localhost:8080/api/notification/${rn}`);
  } 
}