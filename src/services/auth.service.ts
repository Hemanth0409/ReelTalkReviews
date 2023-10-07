import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environment/environment';
import { TokenApiModel } from 'src/models/tokenApi.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload: any;
  public authStatus=new BehaviorSubject<boolean>(true);
  public currentStatus = this.authStatus.asObservable();
authSubject=new Subject<boolean>;
  refreshURL=environment.userTokenRefresh
  constructor(private http:HttpClient) {
    this.userPayload = this.decodeToken();
  }
  public searchTerm = new Subject<string>;

  changeSearchTerm(value: string) {
    this.searchTerm.next(value);
  }
  // userRole:Subject<s>
broadcastSubject(item:boolean){
this.authSubject.next(item);
}

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  storeRefreshToken(tokenValue: string) {
    localStorage.setItem('refreshToken', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }
  getUserName() {
    if (this.userPayload){
      console.log(this.userPayload.unique_name);
      return this.userPayload.unique_name;
    }
  }
  getUserID(){
    if(this.userPayload){
      console.log(this.userPayload.sub);
      return this.userPayload.sub;
    }
  }
  getRole() {
    if (this.userPayload){
      console.log(this.userPayload.role)
      return this.userPayload.role;
    }
  }
  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(this.refreshURL, tokenApi);
  }
}
