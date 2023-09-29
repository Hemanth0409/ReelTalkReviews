import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/models/UserDetails';
import { ApiService } from 'src/services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
constructor(private api:ApiService){}

   users:UserDetail[]= [];
  ngOnInit(): void {
    this.api.getUsers().subscribe(res=>{
        this.users=res;
        console.log(this.users)
    });
  }
}
