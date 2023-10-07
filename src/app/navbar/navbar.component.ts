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
  public name!: string;
  public id!: string;
  public role!: string;
  hide!: boolean;
  display!: boolean;
  constructor(private login: RegisterationService, private auth: AuthService, private userDetail: UserDetailService, private router: Router) {
  }
  logout() {
    this.login.signOut();
    this.hide = true;
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
      window.location.reload();

      this.router.navigate(['login']);
    })

  }
  ngOnInit(): void {
    const token = this.auth.getToken();
    this.auth.authSubject.subscribe((res) => {
      this.display = res;
    })


    const refreshToken = this.auth.getRefreshToken();
    if (token || refreshToken) {
      this.hide = false;
    }
    else {
      this.hide = true;
    }
    this.userDetail.getFullName().subscribe((val) => {
      let nameForToken = this.auth.getUserName();
      this.name = val || nameForToken;
      console.log(this.name)
    })
    this.userDetail.getRole().subscribe((val2) => {
      let roleFromToken = this.auth.getRole();
      this.role = val2 || roleFromToken;
    })
    this.userDetail.getUserId().subscribe((val3) => {
      let idFromToken = this.auth.getUserID();
      this.id = val3 || idFromToken;
    })
  }

  searchTermEmit(event: any) {
    console.log(event.target.value);
    this.auth.changeSearchTerm(event.target.value);
  }
}