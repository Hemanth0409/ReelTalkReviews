import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environment/environment'
import { UserDetail } from 'src/models/UserDetails'
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class RegisterationService {
  constructor(private http: HttpClient, private alert: MessageService, private router: Router,private auth:AuthService) { }

  user_details_url = environment.UserRegisteration;
  userDetails_Login = environment.UserDetailsLogin;
  public authSubject = new Subject<boolean>;
  validateAuth(state: boolean) {
    this.authSubject.next(state);
  }

  // setting a value based on subject
  status?: boolean;
  getAuthStatus() {
    this.authSubject.subscribe(
      res => {
        this.status = res;
      }
    );
    return this.status;
  }

  register(registerForm: UserDetail) {
    return this.http.post<UserDetail>(this.user_details_url, registerForm)
  }

  signIn(loginForm: UserDetail) {
    return this.http.post<UserDetail>(this.userDetails_Login, loginForm)
  } 
  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  
}
