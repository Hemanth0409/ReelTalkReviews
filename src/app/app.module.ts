import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Mat UI
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MessageService } from 'primeng/api';
import { AgGridModule } from 'ag-grid-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RatingModule } from 'primeng/rating';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from 'src/interceptors/token.interceptor';
import { MovielistComponent } from './movielist/movielist.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ActionLinkComponent } from './action-link/action-link.component';
import { PostMovieComponent } from './post-movie/post-movie.component';
import { PostMemberComponent } from './post-member/post-member.component';
import { RatingComponent } from './movielist/rating/rating.component';
import { ViewMovieComponent } from './movielist/view-movie/view-movie.component';
import { UploadImgComponent } from './upload-img/upload-img.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { SortmoviePipe } from 'src/shared/sortmovie.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MovielistComponent,
    UserDetailsComponent,
    ActionLinkComponent,
    PostMovieComponent,
    CelebritiesComponent,
    PostMemberComponent,
    RatingComponent,
    ViewMovieComponent,
    UploadImgComponent,
    SortmoviePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatStepperModule,
    MatIconModule,
    AgGridModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    JsonPipe,
    MatCheckboxModule,
    RatingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, MessageService, DatePipe,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
