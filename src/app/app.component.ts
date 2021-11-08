import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/shared/auth.service';

@Component({
  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent implements OnInit  {
  title = 'late-night-savior';
  currentMsgFromChild1ToChild2="";
  isLoggedIn:boolean;

  constructor(private authService:AuthService){}


  fwdMsgToSib2($event) {
    this.currentMsgFromChild1ToChild2 = $event;
  }

  ngOnInit(){
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
