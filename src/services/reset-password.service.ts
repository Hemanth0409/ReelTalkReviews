import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment'; 
import {ResetPassword} from 'src/models/ResetPassword';
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  emailSetUrl = environment.emailSetUrl;
resetPasswordUrl=environment.resetPassword;
  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.emailSetUrl}/${email}`,{});
  }
  resetPassword(resetPasswordObj:ResetPassword){
    return this.http.post<ResetPassword>(this.resetPasswordUrl,resetPasswordObj);
  }
}
