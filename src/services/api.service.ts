import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { UserDetail } from 'src/models/UserDetails';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
baseURL=environment.UserDetails;
  constructor(private http:HttpClient) { }
  getUsers(){
    console.log("hi");
    return this.http.get<UserDetail[]>(this.baseURL);
    
  }
}
