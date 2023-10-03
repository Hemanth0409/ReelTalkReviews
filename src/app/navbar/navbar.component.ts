import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
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
  public role!: string;
  hide!: boolean;
  constructor(private login: RegisterationService, private auth: AuthService, private userDetail: UserDetailService, private router: Router) {
  }
  logout() {
    this.login.signOut();
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    })
    Toast.fire({
      icon: 'success',
      title: 'Logged successfully'
    }).then(() => {
      this.router.navigate(['login']);
      this.hide = false;
    })
    return true;
  }



  ngOnInit(): void {
    const token = this.auth.getToken();
    const refreshToken = this.auth.getRefreshToken();
    if (token || refreshToken) {
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
      this.role = val || roleFromToken;
    })
  }

}
