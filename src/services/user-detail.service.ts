import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment'
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private userId$ = new BehaviorSubject<string>("");
  userDetail = environment.UserDetails;
  constructor(private auth: AuthService) { }

  public getRole() {
    return this.role$.asObservable();
  }
  public setRole(role: string) {
    console.log(role);
    this.role$.next(role);
  }
  public getUserId() {
    return this.userId$.asObservable();
  }
  public setUserId(id: string) {
    console.log(id);
    this.role$.next(id);
  }
  public getFullName() {
    return this.fullName$.asObservable();
  }
  public setFullName(name: string) {
    this.fullName$.next(name);
  }
}