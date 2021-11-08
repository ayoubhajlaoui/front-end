import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfilComponent } from './user-profil/user-profil.component';

@NgModule({
  declarations: [
    SignUpComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
