import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';
import { NotificationModel } from 'src/app/notification';
import { NotificationService } from 'src/app/notification.service';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './  login-request.payload';
import { Role } from './role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage!: string;
  isError!: boolean;
  returnUrl: string;
  notifications:NotificationModel[];
 

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService, private notificationService: NotificationService ) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

     // get return url from route parameters or default to '/'
     this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email '
          + 'activate your account before you Login!';
      }
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username')!.value;
    this.loginRequestPayload.password = this.loginForm.get('password')!.value;

    
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      if(this.authService.getRole()==Role.User){
        this.router.navigateByUrl('user');
        this.toastr.success('Login Successful');
        this.notificationService.notificationsByRole(Role.Admin).subscribe(data => {
          this.notifications=data;
          for (let notification of this.notifications){
            this.toastr.info(notification.message);
          }
        });
      }
      if(this.authService.getRole()=='ROLE_ADMIN'){
        this.router.navigateByUrl('admin');
        this.toastr.success('Login Successful');
        this.notificationService.notificationsByRole(Role.User).subscribe(data => {
          this.notifications=data;
          for (let notification of this.notifications){
            this.toastr.info(notification.message);
          }
        });
      }

      

    }, error => {
      this.isError = true;
      throwError(error);
    });

    

    



  }
}