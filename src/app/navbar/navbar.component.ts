import { Component, OnInit,DoCheck } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { RegisterationService } from 'src/services/registration.service';
import { UserDetailService } from 'src/services/user-detail.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public name: string = "";
  public role:string="";
  constructor(private login: RegisterationService, private auth: AuthService, private userDetail: UserDetailService) {
  }
  logout() {
    this.login.signOut();
  }
  // ngDoCheck():void{
  //   this.userDetail.getFullName().subscribe((val) => {
  //     let nameForToken = this.auth.getUserName();
  //     let roleFormToken=this.auth.getRole();
  //     console.log(nameForToken);
  //     this.name = val || nameForToken;
  //     this.role= val || roleFormToken;
  //     console.log(this.name)
  //   })
  // }
  ngOnInit(): void {    
    this.userDetail.getFullName().subscribe((val) => {
      let nameForToken = this.auth.getUserName();
      let roleFormToken=this.auth.getRole();
      console.log(nameForToken);
      this.name = val || nameForToken;
      this.role= val || roleFormToken;
      console.log(this.name)
    })
  }

}
