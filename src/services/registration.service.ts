import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {environment} from 'src/environment/environment'
import {UserDetail} from 'src/models/UserDetails'



@Injectable({
  providedIn: 'root'
})
export class RegisterationService {
  constructor(private http: HttpClient, private alert: MessageService, private router: Router) { }

  user_details_url = 'https://localhost:7205/api/UserDetails';

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

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: () => {
          console.log('error')
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

  signIn() {
    return this.http.get<UserDetail[]>(this.user_details_url);
  }

  getActiveUser() {
    return this.http.get<UserDetail[]>(this.user_details_url + '/?islogged_like=true');
  }

  isLoggedIn(item: UserDetail, id: number) {
    let reg = this.user_details_url + '/' + id;
    item.isLogged = true;
    return this.http.put(reg, item).subscribe(() => { });
  }
  isLoggedOut(item: UserDetail, id: number) {
    let reg = this.user_details_url + '/' + id;
    item.isLogged = false;
    return this.http.put(reg, item).subscribe(() => { });
  }
}
