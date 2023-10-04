import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from 'src/gaurd/auth.guard';
import { MovielistComponent } from './movielist/movielist.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PostMovieComponent } from './post-movie/post-movie.component';
import { CelebritiesComponent } from './celebrities/celebrities.component';
import { PostMemberComponent } from './post-member/post-member.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,canActivate:[authGuard]
  },
  {
    path: 'movie',
    component: MovielistComponent,
  }
  ,
  {
    path: 'users',
    component: UserDetailsComponent,canActivate:[authGuard]
  },
  {
    path: 'postmovie',
    component: PostMovieComponent,canActivate:[authGuard]
  },
  {
    path: 'celebrities',
    component: CelebritiesComponent,canActivate:[authGuard] 
  },{
    path:'postmembers',
    component:PostMemberComponent,canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
