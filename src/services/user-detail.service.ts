import { Injectable } from '@angular/core';
import {UserDetail} from 'src/models/UserDetails'
import {environment} from 'src/environment/environment'
@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  userDetail=environment.UserDetailApi; 
  constructor() { }
}
