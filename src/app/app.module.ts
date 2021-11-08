import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { TokenInterceptor } from './  token-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VoteButtonComponent } from './shared/vote-button/vote-button.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';

import { SubredditSideBarComponent } from './shared/subreddit-side-bar/subreddit-side-bar.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ListSubredditsComponent } from './subreddit/list-subreddits/list-subreddits.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { UserProfilComponent } from './auth/user-profil/user-profil.component';
import { ManagerComponent } from './manager/manager.component';
import { UserService } from './shared/user.service';
import {MatBadgeModule} from '@angular/material/badge';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { AddComponent } from './tasks/add/add.component';
import { TaskhomeComponent } from './tasks/taskhome/taskhome.component'; 

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { ListComponent } from './tasks/list/list.component';
import { ShowComponent } from './tasks/show/show.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ViewSubredditComponent } from './subreddit/view-subreddit/view-subreddit.component';
import { UploadanddownloadComponent } from './post/create-post/uploadanddownload/uploadanddownload.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Header2Component } from './header2/header2.component';
import { LeftcolumnComponent } from './leftcolumn/leftcolumn.component';
import { NewcomponentComponent } from './newcomponent/newcomponent.component';
import { Header3Component } from './header3/header3.component';
import { TabsComponent } from './tabs/tabs.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { HomeheaderComponent } from './homeheader/homeheader.component';
import { SeeuserComponent } from './seeuser/seeuser.component';
import { HomeComponent } from './home/home.component';
import { MatStepperModule } from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';

import {of} from 'rxjs';

import {NgBootstrapDarkmodeModule, THEME_LOADER, THEME_SAVER} from 'ng-bootstrap-darkmode';
import { DragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CounterDirective } from './subreddit/list-subreddits/counter.directive';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AccountsmanagerComponent } from './accountsmanager/accountsmanager.component'; 



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    
    VoteButtonComponent,
    PostTileComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    CreateSubredditComponent,
    CreatePostComponent,
    ListSubredditsComponent,
    ViewPostComponent,
    UserProfilComponent,
    ManagerComponent,
    LeftSideBarComponent,
    AddComponent,
    TaskhomeComponent,
    ListComponent,
    ShowComponent,
    
    ViewSubredditComponent,
    UploadanddownloadComponent,
    Header2Component,
    LeftcolumnComponent,
    NewcomponentComponent,
    Header3Component,
    TabsComponent,
    AdminComponent,
    UserComponent,
    FilemanagerComponent,
    HomeheaderComponent,
    SeeuserComponent,
    HomeComponent,
    NotificationsListComponent,
    NavbarComponent,
    FooterComponent,
    ContactFormComponent,
    CounterDirective,
    AccountsmanagerComponent
    
    
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule,
    FormsModule,
    MatBadgeModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    ChartsModule,
    ScrollingModule,
    MatSidenavModule,
    MatStepperModule,
    MatRadioModule,
    NgBootstrapDarkmodeModule,
    DragDropModule,
    LoadingBarRouterModule,
    MatSlideToggleModule,
    MatButtonToggleModule
      
  ],
  providers: [
    UserService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent, ListSubredditsComponent, CounterDirective]
})
export class AppModule { }
