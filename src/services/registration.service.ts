import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environment/environment'
import { UserDetail } from 'src/models/UserDetails'
@Injectable({
  providedIn: 'root'
})
export class RegisterationService {
  constructor(private http: HttpClient, private alert: MessageService, private router: Router) { }

  user_details_url = environment.UserDetailApi;
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

  register(form: UserDetail) {
    return this.http.post<UserDetail>(this.user_details_url, form).subscribe(
      {
        next: () => { 
            this.router.navigate(['login']);        
        },
        error: (error) => {
          console.log(error )
          this.alert.add({
            key: 'tc',
            severity: 'error',
            summary: 'Try again later',
            detail: 'Something went wrong',
          });
        }
      }
    );
  }

  signIn(form: UserDetail) {
    return this.http.post<UserDetail[]>(this.userDetails_Login, form).subscribe(
      {
        next: () => {
            this.router.navigate(['home']);   
        },
        error: (err) => {
          console.log(err)
          this.alert.add({
            key: 'tc',
            severity: 'error',
            summary: 'Try again later',
            detail: 'Something went wrong',
          });
        }
      }
    );
  } 
}
