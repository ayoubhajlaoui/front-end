import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../auth/login/role';
import { AuthService } from '../auth/shared/auth.service';
import { FileService } from '../file.service';
import { FileModel } from '../post/create-post/uploadanddownload/file';

@Component({
  selector: 'app-newcomponent',
  templateUrl: './newcomponent.component.html',
  styleUrls: ['./newcomponent.component.css']
})
export class NewcomponentComponent implements OnInit {
  files:FileModel[];
  username:string;
  //searchedFiles:FileModel[];
  //displayViewAll:boolean;
  showBars:boolean;

    

  constructor(private fileService: FileService, private router: Router, private authService: AuthService ) {

   }

  ngOnInit(): void {
    // this.fileService.getAllFiles().subscribe(data => {
      
    //     this.files = data;
      
    // });
    this.getAllFiles();
  }

  // goToHome(){
  //   this.router.navigateByUrl('admin');

  // }
  getAllFiles(){
    if (this.authService.getRole()==Role.User){
      this.showBars=false;
      this.fileService.getFileByUsername(this.authService.getUserName()).subscribe(data =>{
        this.files=data;
      })
    }else{
      this.showBars=true;

      this.fileService.getAllFiles().subscribe(data =>{
        this.files=data;
      })

    }
    
    return this.files
  }

  getFilesByUsername(){
    // this.username = (document.getElementById("text") as HTMLInputElement).value;
    this.fileService.getFileByUsername(this.username).subscribe(data =>{
      this.files = data;
    });
    if(!this.username){
      this.fileService.getAllFiles().subscribe(data => {
      
        this.files = data;
      
    });
    }
  }

}
