import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userPayload: any;
  constructor() {
    this.userPayload = this.decodeToken();
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }
  getToken() {
    return localStorage.getItem('token');
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
      return this.userPayload.name;
    }
  }
  getRole() {
    if (this.userPayload){
      return this.userPayload.role ;
    }
  }
}
