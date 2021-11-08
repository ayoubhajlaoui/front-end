import { Component, Input,ViewEncapsulation, OnInit } from '@angular/core';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/file.service';
import { NotificationService } from 'src/app/notification.service';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Role } from 'src/app/auth/login/role';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  @Input()posts: PostModel[] = [];
  fileInfos?: Observable<any>;

  fileId:string;
  show: boolean;

  file: File;
  
  
  

  constructor(private router: Router, private uploadService:FileService, private notificationService: NotificationService, private postService: PostService, private authService: AuthService, private toastr: ToastrService ) {
    if(authService.getRole()==Role.Admin){
      this.show=false;
    }else{this.show=true}
  }
    
     

  ngOnInit(): void {
  }


  goToPost(id: number): void {
    this.notificationService.deleteNotificationByPostId(id).subscribe(
      (d) => {});
    this.router.navigateByUrl('/view-post/' + id);
   
  }

  deletePost(id:number):void {
    this.postService.deletePost(id).subscribe(data =>{
      //window.location.reload();
      //this.router.navigateByUrl('admin');
      this.posts = this.posts.filter(item => item.id != id);
      
    });
    
    
    
    
    //this.router.navigateByUrl('admin');
  }


  getFileById(id:string):any{
    this.uploadService.getFileById(id).subscribe(data =>{
      this.file = data;
    });
    return this.file;
     
    }

    downloadFile(name: string): void {
      this.uploadService
        .download(name)
        .subscribe(blob => saveAs(blob, name));
    }
}

