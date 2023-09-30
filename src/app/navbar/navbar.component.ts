import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { RegisterationService } from 'src/services/registration.service';
import { UserDetailService } from 'src/services/user-detail.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public name: string = "";
  public role!: string ;
  hide!: boolean;
  constructor(private login: RegisterationService, private auth: AuthService, private userDetail: UserDetailService,private router:Router   ) {
  }
  logout() {
    this.login.signOut();  
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'success',
            title: 'Logged successfully'
          }).then(() => {
            this.router.navigate(['login']);
          })
          return true;
        }     
  
  

  ngOnInit(): void {
    const token = this.auth.getToken();
    if (token) {
      this.hide = true;
    }
    else {
      this.hide = false;
    }
    this.userDetail.getFullName().subscribe((val) => {
      let nameForToken = this.auth.getUserName();
      this.name = val || nameForToken;
      console.log(this.name)
    })
    this.userDetail.getRole().subscribe((val) => {
      let roleFromToken = this.auth.getRole();
      this.role=val||roleFromToken;
    })
  }

}
