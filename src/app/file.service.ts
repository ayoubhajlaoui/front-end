import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from './shared/post-model';
import { FileModel } from './post/create-post/uploadanddownload/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/api/file/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // getFiles(postId:number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/api/file/files/${postId}`);
  // }

  getAllFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/file/files`);
  }

  getFileByUser():Observable<any>{
    return this.http.get(`${this.baseUrl}/files`);
  }
  getFileById(id:string):Observable<any>{
    return this.http.get(`${this.baseUrl}/api/file/fileById/${id}`);
  }
  getFileByPostId(postId: number):Observable<any>{
    return this.http.get(`${this.baseUrl}/api/file/fileByPostId/${postId}`);
  }


  download(filename: string) : Observable<Blob> {
    return this.http.get(`${this.baseUrl}/api/file/download/${filename}`, {
      responseType: 'blob'
    });
  }

  getFileByUsername(username: string):Observable<any>{
    return this.http.get(`${this.baseUrl}/api/file/fileByUsername/${username}`);
  }




}