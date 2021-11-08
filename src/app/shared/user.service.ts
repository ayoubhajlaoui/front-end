import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../manager/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/accountmanager/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/accountmanager/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/accountmanager/update`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/accountmanager/delete/${userId}`);
  }
  public getUserByUsername(username: String): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/accountmanager/find/${username}`);
  }


}