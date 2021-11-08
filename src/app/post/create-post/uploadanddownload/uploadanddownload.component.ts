import { HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileService } from '../../../file.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { FileModel } from './file';


@Component({
  selector: 'app-uploadanddownload',
  templateUrl: './uploadanddownload.component.html',
  styleUrls: ['./uploadanddownload.component.css']
})
export class UploadanddownloadComponent implements OnInit  {

  @Output() newItemEvent = new EventEmitter<string>();

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  //fileName!:string ;

  fileInfos?: Observable<any>;

  

  constructor(private uploadService: FileService) { }

  ngOnInit(){
    this.fileInfos = this.uploadService.getAllFiles();
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.addNewItem(file!.name);
      
      
      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getAllFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
    
  }


  
}