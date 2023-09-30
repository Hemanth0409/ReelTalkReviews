import { Injectable } from '@angular/core';
import {UserDetail} from 'src/models/UserDetails'
import {environment} from 'src/environment/environment'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
private fullName$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");
  userDetail=environment.UserDetails; 
  constructor() { }
  public getRole(){
    return this.role$.asObservable();
  }
  public setRole(role:string){
this.role$.next(role);
  }
  public getFullName(){
   return this.fullName$.asObservable();
  }
  public setFullName(name:string){
    this.fullName$.next(name);
  }
}
