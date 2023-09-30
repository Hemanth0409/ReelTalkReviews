import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { RegisterationService } from 'src/services/registration.service';
import { UserDetailService } from 'src/services/user-detail.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public name:string="";
  constructor(private login: RegisterationService,private auth:AuthService,private userDetaail:UserDetailService) {
  }
  logout() {
    this.login.signOut();
  }
  ngOnInit(): void {
    this.userDetaail.getFullName().subscribe((res)=>{
        this.name=res 
    })
  }

}
