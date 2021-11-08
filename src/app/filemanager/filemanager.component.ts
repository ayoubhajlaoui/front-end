import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { FileService } from '../file.service';
import { FileModel } from '../post/create-post/uploadanddownload/file';

@Component({
  selector: 'app-filemanager',
  templateUrl: './filemanager.component.html',
  styleUrls: ['./filemanager.component.css']
})
export class FilemanagerComponent implements OnInit {

  files:FileModel[];
  displayViewAll:boolean;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.getAllFiles().subscribe(data => {
      if (data.length > 3) {
        this.files = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.files = data;
      } 
    });
  }



}
