import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsmanagerComponent } from './accountsmanager/accountsmanager.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { Role } from './auth/login/role';
import { SignUpComponent } from './auth/sign-up/signup.component';
import { UserProfilComponent } from './auth/user-profil/user-profil.component';
import { HomeComponent } from './home/home.component';

import { ManagerComponent } from './manager/manager.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewcomponentComponent } from './newcomponent/newcomponent.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { SeeuserComponent } from './seeuser/seeuser.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';
import { ViewSubredditComponent } from './subreddit/view-subreddit/view-subreddit.component';
import { AddComponent } from './tasks/add/add.component';
import { TaskhomeComponent } from './tasks/taskhome/taskhome.component';
import { UserComponent } from './user/user.component';
const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  

  { path: 'admin', component: AdminComponent, 
  canActivate: [AuthGuard], 
  data: { roles: [Role.Admin] } },

  { path: 'user', component: UserComponent, 
  canActivate: [AuthGuard], 
  data: { roles: [Role.User] } },
  { path: 'user-profile/:name', component: UserProfilComponent, canActivate: [AuthGuard] },
  { path: 'view-post/:id', component: ViewPostComponent,canActivate: [AuthGuard]},
  { path: 'list-subreddits', component: ListSubredditsComponent,canActivate: [AuthGuard] },
  { path: 'view-subreddit/:id', component: ViewSubredditComponent,canActivate: [AuthGuard]},
  
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [AuthGuard] },
  
  { path: 'signup', component: SignUpComponent},
  { path: 'accountsmanager', component: AccountsmanagerComponent,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },

  { path: 'add', component: AddComponent},
  { path: 'taskHome', component: TaskhomeComponent},

  { path: 'newcomponent', component: NewcomponentComponent,canActivate: [AuthGuard], data: { roles: [Role.Admin] }},

  { path: 'notifications-list', component: NotificationsListComponent},

  { path: 'navbar', component: NavbarComponent},


  { path: 'seeuser/:userName', component: SeeuserComponent},
  { path: 'home', component: HomeComponent},
  
  { path: '**', redirectTo: '/home' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
