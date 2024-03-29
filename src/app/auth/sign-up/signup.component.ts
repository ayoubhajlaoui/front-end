import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
   
  signupForm!: FormGroup;
  signupRequestPayload:SignupRequestPayload;
  //roles = new FormArray([]); 

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupRequestPayload  = {
      username:'',
      email:'',
      password:'',
      roles: [] 
    };
   
   }

  ngOnInit() {
      this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormArray([new FormControl('', Validators.required)])
    });
  }


  signup() {
    this.signupRequestPayload.username = this.signupForm?.get('username')?.value;
    this.signupRequestPayload.email = this.signupForm?.get('email')?.value;
    this.signupRequestPayload.password = this.signupForm?.get('password')?.value;
    this.signupRequestPayload.roles = this.signupForm?.get('role')?.value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe(() => {
        this.router.navigate(['/accountsmanager'], { queryParams: { registered: 'true' } });
      }, () => {
        this.toastr.error('Registration Failed! Please try again');
      });
  }

}