import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environment/environment';
import { TokenApiModel } from 'src/models/tokenApi.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload: any;
  refreshURL=environment.userTokenRefresh
  constructor(private http:HttpClient) {
    this.userPayload = this.decodeToken();
  }

  // userRole:Subject<s>

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
      return this.userPayload.unique_name;
    }
  }
  getRole() {
    if (this.userPayload){
      return this.userPayload.role;
    }
  }
  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(this.refreshURL, tokenApi)
  }
}
